/**
 * Created by mq on 18-05-30.
 * wx内部逻辑
 */
import path from 'path';
import debug from 'debug';
const _d = debug('@tslib/qyWxLib:' + path.basename(__filename));

import _ from 'lodash';
import querystring from 'querystring';
import WxHttp from './wx.http';
import WxMsg from './wx.msg';
import WxUser from './wx.user';
import { IWX_CFG } from './def';
import url from 'url';
import { ReadStream } from 'tty';

export default class WxLib {
  /** ******************************   私有变量    ******************************** * */
  private _wxCfg: IWX_CFG;
  private _wxHttp: WxHttp;
  private _wxMsg: WxMsg;
  private _wxUser: WxUser;
  constructor(cfg: IWX_CFG) {
    this._wxCfg = cfg;
    this._wxHttp = new WxHttp(cfg);
    this._wxMsg = new WxMsg(this._wxHttp);
    this._wxUser = new WxUser(this._wxHttp);
  }
  /** ******************************   公有函数    ******************************** * */
  public getWxMsg() {
    return this._wxMsg;
  }
  public getWxUser() {
    return this._wxUser;
  }
  public getWxHttp() {
    return this._wxHttp;
  }
  /**
   * 构建微信认证进行跳转的url,去除url的所有请求参数,执行跳转认证
   * @param reqUrl 请求的url
   * @returns {string} 拼接的微信认证url字符串
   */
  public makeWeixinAuthUrl(reqUrl: string) {
    const u1 = url.parse(reqUrl, true);
    //去除url的code,stat参数
    let u = `${u1.protocol}//${u1.host}${u1.pathname}`;
    if (!_.isEmpty(u1.query)) {
      delete u1.query['code'];
      if (!_.isEmpty(u1.query)) {
        // 判断删除code之后还有无参数
        const newSearchStr = querystring.stringify(u1.query);
        u = `${u1.protocol}//${u1.host}${u1.pathname}?${newSearchStr}`;
      }
    }
    //否则通知进行跳转,获取用户code
    const wxurl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
      this._wxCfg.corpId
    }&redirect_uri=${encodeURIComponent(
      u
    )}&response_type=code&scope=snsapi_base&wxurl=zf#wechat_redirect`;
    return url.format(wxurl);
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
    return this._wxHttp.wxApiPost(
      'media/upload',
      { access_token: this._wxHttp.getLocalToken(agentid), type },
      { media: fileStream },
      agentid,
      'postIMG'
    );
  }
  /** ******************************   私有函数    ******************************** * */
}
