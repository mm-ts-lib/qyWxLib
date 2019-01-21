/**
 * Created by mq on 18-05-30.
 * 发送wx应用消息
 */
import path from 'path';
import debug from 'debug';
const _d = debug('@tslib/qyWxLib:' + path.basename(__filename));

import WxHttp from './wx.http';
import { IWX_MSG_RES, IWX_ARTICLE } from './def';

export default class WxMsg {
  /** ******************************   私有变量    ******************************** * */
  private _wxHttp: WxHttp;

  constructor(wxHttp: WxHttp) {
    this._wxHttp = wxHttp;
  }
  /** ******************************   公有函数    ******************************** * */
  /**
   * 发送文本消息
   */
  public async sendText(
    agentid: string,
    content: string,
    touser?: string,
    toparty?: string,
    totag?: string,
  ): Promise<IWX_MSG_RES> {
    return this._wxHttp.wxApiPost(
      'message/send',
      {
        access_token: this._wxHttp.getLocalToken(agentid),
      },
      {
        touser, // _userIdStr,
        toparty,
        totag,
        msgtype: 'text',
        agentid,
        text: { content },
        safe: 0,
      },
      agentid,
    );
  }
  /**
   * 发送图片消息
   */
  public async sendImage(
    agentid: string,
    media_id: string,
    touser?: string,
    toparty?: string,
    totag?: string,
  ): Promise<IWX_MSG_RES> {
    return this._wxHttp.wxApiPost(
      'message/send',
      {
        access_token: this._wxHttp.getLocalToken(agentid),
      },
      {
        touser, // _userIdStr,
        toparty,
        totag,
        msgtype: 'image',
        agentid,
        image: { media_id },
        safe: 0,
      },
      agentid,
    );
  }
  /**
   * 发送图文消息
   */
  public async sendArticles(
    agentid: string,
    articles: Array<IWX_ARTICLE>,
    touser?: string,
    toparty?: string,
    totag?: string,
  ): Promise<IWX_MSG_RES> {
    if (articles.length > 8) {
      throw new Error('一个图文消息支持1到8条图文');
    }
    return this._wxHttp.wxApiPost(
      'message/send',
      {
        access_token: this._wxHttp.getLocalToken(agentid),
      },
      {
        touser, // _userIdStr,
        toparty,
        totag,
        msgtype: 'news',
        agentid,
        news: {
          articles,
        },
      },
      agentid,
    );
  }
  /** ******************************   私有函数    ******************************** * */
}
