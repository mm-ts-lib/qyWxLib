/**
 * Created by mq on 18-05-30.
 * accessToken管理
 */
import path from 'path';
import debug from 'debug';
const _d = debug('@tslib/qyWxLib:' + path.basename(__filename));

import _ from 'lodash';
import request, { RequestPromiseOptions } from 'request-promise';
import querystring from 'querystring';
import { IWX_CFG, ILOCAL_TOKENS } from './def';
import { UriOptions } from 'request';
import { RequestOptions } from 'https';
import { resolve } from 'url';
import { reject } from 'bluebird';

export default class WxToken {
  /** ******************************   私有变量    ******************************** * */
  private _tokens: ILOCAL_TOKENS = {}; // 分应用存储
  private _wxCfg: IWX_CFG; // 记录配置信息

  constructor(cfg: IWX_CFG) {
    this._wxCfg = cfg;
  }
  /** ******************************   公有函数    ******************************** * */
  /**
   * 获取缓存的accessToken
   */
  public getLocalToken(agentId: string): string {
    if (_.isString(agentId)) {
      const _retToken = this._tokens[agentId];
      if (_retToken) {
        return _retToken;
      }
    }
    // 其他返回默认值
    const _defaultAgentId = this._wxCfg.agents[0].agentId;
    return this._tokens[_defaultAgentId];
  }
  /**
   *发送微信api Get请求
   * cmd：请求命令 ‘message/send‘
   * queryParam：请求url上所带参数,{access_token:self.accessToken} => ?access_token=xxx
   * callback：回调函数
   */
  public async wxApiGet(cmd: string, queryParam: object, agentId: string) {
    let retryTimes = 3;
    return new Promise((resolve, reject) => {
      let _newToken = '';
      const _attemptFn = async () => {
        try {
          if (retryTimes <= 0) {
            reject({ message: 'Retry to Update AccessToken 3 times' });
          } else {
            const _getRet = await this._wxHttp(
              'GET',
              cmd,
              queryParam,
              agentId,
              {},
              _newToken
            );
            const _errcode = _.get(_getRet, 'errcode');
            if (_errcode === 'retry') {
              _newToken = _.get(_getRet, 'newToken');
              _d('+++++++++++++++++wxApiGet retry:', retryTimes);
              retryTimes -= 1;
              _attemptFn(); // 重试
            } else {
              resolve(_getRet);
            }
          }
        } catch (e) {
          reject(e);
        }
      };

      _attemptFn();
    });
  }
  /**
   *发送微信api Post请求
   * cmd：请求命令 ‘message/send‘
   * queryParam：请求url上所带参数,{access_token:self.accessToken} => ?access_token=xxx
   * postData：post参数
   * callback：回调函数
   */
  public async wxApiPost(
    cmd: string,
    queryParam: object,
    postData: object,
    agentId: string,
    postType?: string
  ) {
    let retryTimes = 3;
    // 组装post请求数据
    let _reqData = { url: '' };
    if (_.isEmpty(postType)) {
      _reqData = Object.assign(_reqData, {
        headers: {
          'Content-type': 'application/json'
        },
        json: postData
      });
    } else {
      // postType用来指定调用xml请求时
      _reqData = Object.assign(_reqData, {
        formData: postData
      });
    }
    return new Promise((resolve, reject) => {
      const _attemptFn = async (newToken: string) => {
        try {
          if (retryTimes <= 0) {
            reject({ message: 'Retry to Update AccessToken 3 times' });
          } else {
            const _postRet = await this._wxHttp(
              'POST',
              cmd,
              queryParam,
              agentId,
              _reqData,
              newToken
            );

            const _errcode = _.get(_postRet, 'errcode');
            if (_errcode === 'retry') {
              newToken = _.get(_postRet, 'newToken');
              _d('+++++++++++++++++wxApiPost retry:', retryTimes);
              retryTimes -= 1;
              _attemptFn(newToken); // 重试
            } else {
              resolve(_postRet);
            }
          }
        } catch (e) {
          reject(e);
        }
      };

      _attemptFn('');
    });
  }
  /** ******************************   私有函数    ******************************** * */
  /*
   * 查找当前应用配置信息
   * */
  private _getCurAgentInfo(agentId: string) {
    let curAgent: { agentId: string; secret: string } | undefined;
    if (!_.isString(agentId)) {
      curAgent = this._wxCfg.agents[0];
    } else {
      // 先查找当前应用配置信息
      curAgent = _.find(this._wxCfg.agents, o => o.agentId === agentId);
      if (_.isUndefined(curAgent)) {
        curAgent = this._wxCfg.agents[0]; // 默认
      }
    }

    if (_.isUndefined(curAgent)) {
      // 未找到
      return {};
    }
    return {
      agentId,
      corpId: this._wxCfg.corpId,
      secret: curAgent.secret
    };
  }
  /**
   * 从微信服务器获取访问令牌
   * 获取不同应用的 accessToken
   * @param cb 成功后的回调函数,原型:function(err,accessToken)
   */
  private async _getRemoteToken(agentId: string) {
    const curAgentInfo = this._getCurAgentInfo(agentId);

    return new Promise(async (resolve, reject) => {
      if (_.isEmpty(curAgentInfo)) {
        reject({ message: `应用ID${agentId}不存在` });
        return;
      }

      try {
        const _wxGetRet = await this.wxApiGet(
          'gettoken',
          {
            corpid: curAgentInfo.corpId,
            corpsecret: curAgentInfo.secret
          },
          agentId
        );
        _d('WX GET ACCESS:', typeof _wxGetRet, _wxGetRet);
        const _aToken: string = _.get(_wxGetRet, 'access_token');
        if (_.isString(curAgentInfo.agentId)) {
          this._tokens[curAgentInfo.agentId] = _aToken;
        }
        resolve(_aToken);
      } catch (e) {
        _d('WX GET ACCESS_FAIL:', e);
        reject(e);
      }
    });
  }
  /** ******************************   WX GET POST    ******************************** * */
  /**
   * 解析返回的结果 json/string -> json
   */
  private async _wxResBody_ToJson(wxRet: object | string) {
    return new Promise((resolve, reject) => {
      if (_.isString(wxRet)) {
        try {
          // 防止json解析出错
          resolve(JSON.parse(wxRet));
        } catch (e) {
          reject({ message: `wxRet：${wxRet} NOT JSON` });
          return;
        }
      }
      resolve(wxRet);
    });
  }
  /**
   * 返回request函数：type: get/post
   */
  private async _getRequest(reqType: 'GET' | 'POST', reqData: any) {
    if (reqType === 'POST') {
      return request.post(reqData);
    }
    return request.get(reqData);
  }
  /**
   * 解析wx返回结果
   */
  private async _parseWxRetBody(resBody: object | string, agentId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        // get请求只返回string, post返回json/string
        const json = await this._wxResBody_ToJson(resBody);
        // 检测accessToken错误,发现错误后重新获取accessToken,然后重试
        const _errCode = _.get(json, 'errcode');
        switch (_errCode) {
          case 0:
            resolve(json); // 成功调用
            // resolve({ errcode: 'retry', newToken: '11111' });
            break;
          case 40014:
          case 41001:
          case 42001:
            {
              // {"errcode":41001,"errmsg":"access_token missing"}
              // 重试获取access_token,然后重新设置accesstoken,重新发起请求
              const newToken = await this._getRemoteToken(agentId);
              resolve({ errcode: 'retry', newToken });
            }
            break;
          default:
            // 改版之后，返回结果中必定存在 errcode errmsg
            reject({ message: `json.errcode:${_errCode}` });
            break;
        }
      } catch (e) {
        reject(e);
      }
    });
  }
  /**
   * WXHTTP
   */
  private async _wxHttp(
    reqType: 'GET' | 'POST',
    cmd: string,
    queryParam: object,
    agentId: string,
    reqData: object,
    newToken: string
  ) {
    // 成功更新accessToken //注：access_token在queryParam中
    if (!_.isEmpty(newToken)) {
      _.set(queryParam, 'access_token', newToken);
    }
    return new Promise(async (resolve, reject) => {
      try {
        let _newUrl = `https://qyapi.weixin.qq.com/cgi-bin/${cmd}?${querystring.stringify(
          queryParam
        )}`;
        _.set(reqData, 'url', _newUrl);

        // 当access_token无效时，需要从新赋值，故需要querystring.stringify
        const _resBody = await this._getRequest(reqType, reqData);
        const _json = await this._parseWxRetBody(_resBody, agentId);
        resolve(_json);
      } catch (e) {
        reject(e); // 获取accessToken错误 + JSON.parse错误
      }
    });
  }
}

// export default new Token();
