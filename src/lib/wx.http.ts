/**
 * Created by mq on 18-05-30.
 * accessToken管理
 */
import path from 'path';
import debug from 'debug';
const _d = debug('@tslib/qyWxLib:' + path.basename(__filename));

import _ from 'lodash';
import request from 'request-promise';
import querystring from 'querystring';
import WxToken from './wx.token';
import { IWX_CFG } from './def';

export default class WxHttp {
  /** ******************************   私有变量    ******************************** * */
  private _wxToken: WxToken;
  constructor(cfg: IWX_CFG) {
    this._wxToken = new WxToken(cfg, this);
  }
  /** ******************************   公有函数    ******************************** * */
  // public getWxToken() {
  //   return this._wxToken;
  // }
  public getLocalToken(agentid: string) {
    return this._wxToken.getLocalToken(agentid);
  }
  /**
   *发送微信api Get请求
   * cmd：请求命令 ‘message/send‘
   * queryParam：请求url上所带参数,{access_token:self.accessToken} => ?access_token=xxx
   * callback：回调函数
   */
  public async wxApiGet(
    cmd: string,
    queryParam: object,
    agentid: string
  ): Promise<any> {
    return this._reqRetry(3, {
      reqType: 'GET',
      cmd,
      queryParam,
      agentid,
      reqData: {}
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
    agentid: string,
    postType?: string
  ): Promise<any> {
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

    return this._reqRetry(3, {
      reqType: 'POST',
      cmd,
      queryParam,
      agentid,
      reqData: _reqData
    });
  }
  /** ******************************   私有函数    ******************************** * */

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
  private async _parseWxRetBody(resBody: object | string, agentid: string) {
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
          case 40014: // 不合法的access_token
          case 41001: // 缺少access_token参数
          case 42001: // access_token已过期, access_token有时效性，需要重新获取一次
            {
              // {"errcode":41001,"errmsg":"access_token missing"}
              // 重试获取access_token,然后重新设置accesstoken,重新发起请求
              const newToken = await this._wxToken.get_Remote_Token(agentid);
              resolve({ errcode: 'retry', newToken });
            }
            break;
          case 40029: // 不合法的oauth_code
            resolve({ errcode: 'invalid oauth_code' }); // 直接返回错误信息
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
   * WxHttPReq
   */
  private async _wxHttpReq(
    reqType: 'GET' | 'POST',
    cmd: string,
    queryParam: object,
    agentid: string,
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
        // const _tmpReqData = _.clone(reqData);
        const _resBody = await this._getRequest(reqType, reqData);
        const _json = await this._parseWxRetBody(_resBody, agentid);
        resolve(_json);
      } catch (e) {
        reject(e); // 获取accessToken错误 + JSON.parse错误
      }
    });
  }
  /**
   * 重试
   */
  private async _reqRetry(
    retryTimes: number,
    reqParams: {
      cmd: string;
      queryParam: object;
      agentid: string;
      reqType: 'GET' | 'POST';
      reqData: object;
    }
  ) {
    return new Promise((resolve, reject) => {
      const _attemptFn = async (newToken: string) => {
        try {
          if (retryTimes <= 0) {
            reject({ message: 'Retry to Update AccessToken 3 times' });
          } else {
            const _postRet = await this._wxHttpReq(
              reqParams.reqType,
              reqParams.cmd,
              reqParams.queryParam,
              reqParams.agentid,
              reqParams.reqData,
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
}

// export default new Token();
