/**
 * Created by mq on 18-05-30.
 * 发送wx应用消息
 */

import path from 'path';
import debug from 'debug';
const _d = debug('@tslib/qyWxLib:' + path.basename(__filename));

import WxHttp from './wx.http';


export default class WxUser {
  /** ******************************   私有变量    ******************************** * */
  private _wxHttp: WxHttp;

  constructor(wxHttp: WxHttp) {
    this._wxHttp = wxHttp;
  }
  /** ******************************   公有函数    ******************************** * */
  /**
   * 通过code获取用户信息
   * @param code
   * @param agentid
   */
  public async userFromCode(
    code: string,
    agentid: string
  ): Promise<{ UserId: string; errcode: 'invalid oauth_code' }> {
    return this._wxHttp.wxApiGet(
      'user/getuserinfo',
      { access_token: this._wxHttp.getLocalToken(agentid), code },
      agentid
    );
  }


  /** ******************************   私有函数    ******************************** * */
}
