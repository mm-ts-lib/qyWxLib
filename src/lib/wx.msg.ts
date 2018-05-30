/**
 * Created by mq on 18-05-30.
 * 发送wx应用消息
 */
import path from 'path';
import debug from 'debug';
const _d = debug('@tslib/qyWxLib:' + path.basename(__filename));

import WxToken from './wx.token';
import { IWX_MSG_RES } from './def';

export default class WxMsg {
  /** ******************************   私有变量    ******************************** * */
  private _wxToken: WxToken;

  constructor(newWxToken: WxToken) {
    this._wxToken = newWxToken;
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
    totag?: string
  ): Promise<IWX_MSG_RES> {
    return this._wxToken.wxApiPost(
      'message/send',
      {
        access_token: this._wxToken.getLocalToken(agentid)
      },
      {
        touser, // _userIdStr,
        toparty,
        totag,
        msgtype: 'text',
        agentid,
        text: { content },
        safe: 0
      },
      agentid
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
    totag?: string
  ): Promise<IWX_MSG_RES> {
    return this._wxToken.wxApiPost(
      'message/send',
      {
        access_token: this._wxToken.getLocalToken(agentid)
      },
      {
        touser, // _userIdStr,
        toparty,
        totag,
        msgtype: 'image',
        agentid,
        image: { media_id },
        safe: 0
      },
      agentid
    );
  }
  /**
   * 发送图文消息
   */
  /** ******************************   私有函数    ******************************** * */
}
