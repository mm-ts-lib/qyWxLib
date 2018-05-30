/**
 * Created by mq on 18-05-30.
 * wx内部逻辑
 */
import path from 'path';
import debug from 'debug';
const _d = debug('@tslib/qyWxLib:' + path.basename(__filename));

import WxToken from './wx.token';
import WxMsg from './wx.msg';
import { IWX_CFG, ILOCAL_TOKENS, IWX_USER_INFO } from './def';
import url from 'url';
import { ReadStream } from 'tty';

export default class WxLib {
  /** ******************************   私有变量    ******************************** * */
  private _wxCfg: IWX_CFG;
  private _wxToken: WxToken;
  private _wxMsg: WxMsg;
  constructor(cfg: IWX_CFG) {
    this._wxCfg = cfg;
    this._wxToken = new WxToken(cfg);
    this._wxMsg = new WxMsg(this._wxToken);
  }
  /** ******************************   公有函数    ******************************** * */
  public getWxMsg() {
    return this._wxMsg;
  }
  /**
   * 构建微信认证进行跳转的url,去除url的所有请求参数,执行跳转认证
   * @param reqUrl 请求的url
   * @returns {string} 拼接的微信认证url字符串
   */
  makeWeixinAuthUrl(reqUrl: string) {
    //去除url的code,stat参数
    const u1 = url.parse(reqUrl, true);
    //console.log('AUTH URL:',u1);
    const u = u1.protocol + '//' + u1.host + u1.pathname;
    //否则通知进行跳转,获取用户code
    const wxurl =
      'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
      this._wxCfg.corpId +
      '&redirect_uri=' +
      encodeURIComponent(u) +
      '&response_type=code&scope=snsapi_base&wxurl=zf#wechat_redirect';
    return url.format(wxurl);
  }
  /**
   * 通过code获取用户信息
   * @param code
   * @param agentid
   */
  userFromCode(code: string, agentid: string): Promise<{ UserId: string }> {
    return this._wxToken.wxApiGet(
      'user/getuserinfo',
      { access_token: this._wxToken.getLocalToken(agentid), code },
      agentid
    );
  }
  /**
   * 通过id获取用户信息
   * @param userid
   * @param agentid
   */
  getUserInfoById(userid: string, agentid: string): Promise<IWX_USER_INFO> {
    return this._wxToken.wxApiGet(
      'user/get',
      { access_token: this._wxToken.getLocalToken(agentid), userid },
      agentid
    );
  }
  /**
   * 上传临时素材
   */
  public async uploadTempSrc(
    fileStream: ReadStream,
    agentid: string,
    type: 'image' | 'voice' | 'video' | 'file'
  ): Promise<{
    errcode: number;
    errmsg: string;
    type: 'image' | 'voice' | 'video' | 'file';
    media_id: string;
  }> {
    return this._wxToken.wxApiPost(
      'media/upload',
      { access_token: this._wxToken.getLocalToken(agentid), type },
      { media: fileStream },
      agentid,
      'postIMG'
    );
  }
  /** ******************************   私有函数    ******************************** * */
}
