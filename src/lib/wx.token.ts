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
import { IWX_CFG, ILOCAL_TOKENS } from './def';

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
    const _getFn = () => {
      // 当access_token无效时，需要从新赋值，故需要querystring.stringify
      const _getUrl = `https://qyapi.weixin.qq.com/cgi-bin/${cmd}?${querystring.stringify(
        queryParam
      )}`;

      return new Promise((resolve, reject) => {
        request
          .get(_getUrl)
          .then(body => {
            // get请求只返回string
            let json: { errcode: number };
            try {
              // 防止json解析出错
              json = JSON.parse(body);
            } catch (e) {
              reject(`body：${body} NOT JSON`);
              return;
            }

            // 检测accessToken错误,发现错误后重新获取accessToken,然后重试
            if (json.errcode === 0) {
              // 成功调用
              resolve(json);
            } else if (
              json.errcode === 40014 ||
              json.errcode === 42001 ||
              json.errcode === 41001
            ) {
              // {"errcode":41001,"errmsg":"access_token missing"}
              // 重试获取access_token,然后重新设置accesstoken,重新发起请求
              this._getRemoteToken(agentId)
                .then(retToken => {
                  // 成功更新accessToken //注：access_token在queryParam中
                  _.set(queryParam, 'access_token', retToken);
                  // queryParam.access_token = retToken;
                  resolve('retry');
                })
                .catch(err => {
                  // 获取accessToken错误
                  reject(err.message);
                });
            } else {
              // 改版之后，返回结果中必定存在 errcode errmsg
              reject(`json.errcode:${json.errcode}`);
            }
          })
          .catch(err => {
            _d('===========', err);
            reject(err.message);
          });
      });
    };

    return new Promise((resolve, reject) => {
      const _attemptFn = () => {
        if (retryTimes <= 0) {
          reject('Retry to Update AccessToken 3 times');
        } else {
          _getFn()
            .then(ret => {
              if (ret === 'retry') {
                retryTimes -= 1;
                _attemptFn();
              } else {
                resolve(ret);
              }
            })
            .catch(err => {
              reject(err.message);
            });
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
  // public wxApiPost(
  //   cmd: string,
  //   queryParam: object,
  //   postData: object,
  //   postType: string,
  //   agentId: string
  // ) {
  //   let retryTimes = 3;
  //   const _postFn = () => {
  //     // 当access_token无效时，需要从新赋值，故需要querystring.stringify
  //     const _postUrl = `https://qyapi.weixin.qq.com/cgi-bin/${cmd}?${querystring.stringify(
  //       queryParam
  //     )}`;
  //     let _fetchData = { url: _postUrl };
  //     if (_.isEmpty(postType)) {
  //       _fetchData = Object.assign(_fetchData, {
  //         headers: {
  //           'Content-type': 'application/json'
  //         },
  //         json: postData
  //       });
  //     } else {
  //       // postType用来指定调用xml请求时
  //       _fetchData = Object.assign(_fetchData, {
  //         formData: postData
  //       });
  //     }
  //     return new Promise((resolve, reject) => {
  //       request
  //         .post(_fetchData)
  //         .then(json => {
  //           // 检测accessToken错误,发现错误后重新获取accessToken,然后重试
  //           if (json.errcode === 0) {
  //             // 成功调用
  //             resolve(json);
  //           } else if (
  //             json.errcode === 40014 ||
  //             json.errcode === 42001 ||
  //             json.errcode === 41001
  //           ) {
  //             // {"errcode":41001,"errmsg":"access_token missing"}
  //             // 重试获取access_token,然后重新设置accesstoken,重新发起请求
  //             this._getRemoteToken(agentId)
  //               .then(retToken => {
  //                 // 成功更新accessToken //注：access_token在queryParam中
  //                 queryParam.access_token = retToken;
  //                 resolve('retry');
  //               })
  //               .catch(err => {
  //                 // 获取accessToken错误
  //                 reject(err.message);
  //               });
  //           } else if (_.isUndefined(json.errcode)) {
  //             _d('================发送图片时 jsonStr', json);
  //             // 发送图片时只返回string
  //             let jsonObj = {};
  //             try {
  //               // 防止json解析出错
  //               jsonObj = JSON.parse(json);
  //             } catch (e) {
  //               reject(`body：${json} NOT JSON`);
  //               return;
  //             }
  //             resolve(jsonObj); // 发送 图片时
  //           } else {
  //             // 改版之后，返回结果中必定存在 errcode errmsg
  //             reject(`json.errcode:${json.errcode}`);
  //           }
  //         })
  //         .catch(err => {
  //           _d('5555555555555555555', err);
  //           reject(err.message);
  //         });
  //     });
  //   };

  //   return new Promise((resolve, reject) => {
  //     const _attemptFn = () => {
  //       if (retryTimes <= 0) {
  //         reject('Retry to Update AccessToken 3 times');
  //       } else {
  //         _postFn()
  //           .then(ret => {
  //             if (ret === 'retry') {
  //               retryTimes -= 1;
  //               _attemptFn();
  //             } else {
  //               resolve(ret);
  //             }
  //           })
  //           .catch(err => {
  //             reject(err.message);
  //           });
  //       }
  //     };

  //     _attemptFn();
  //   });
  // }
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

    return new Promise((resolve, reject) => {
      if (_.isEmpty(curAgentInfo)) {
        reject(`应用ID${agentId}不存在`);
        return;
      }

      this.wxApiGet(
        'gettoken',
        {
          corpid: curAgentInfo.corpId,
          corpsecret: curAgentInfo.secret
        },
        agentId
      )
        .then(ret => {
          _d('WX GET ACCESS:', ret);
          const _aToken: string = _.get(ret, 'access_token');
          if (_.isString(curAgentInfo.agentId)) {
            this._tokens[curAgentInfo.agentId] = _aToken;
          }
          resolve(_aToken);
        })
        .catch(err => {
          _d('WX GET ACCESS_FAIL:', err);
          reject(err);
        });
    });
  }
}

// export default new Token();
