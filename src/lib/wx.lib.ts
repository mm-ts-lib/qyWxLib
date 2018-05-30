/**
 * Created by mq on 18-05-30.
 * wx内部逻辑
 */
import path from 'path';
import debug from 'debug';
const _d = debug('@tslib/qyWxLib:' + path.basename(__filename));

import WxToken from './wx.token';
import { IWX_CFG, ILOCAL_TOKENS } from './def';

export default class WxLib {
  /** ******************************   私有变量    ******************************** * */
  private _wxToken: WxToken;

  constructor(cfg: IWX_CFG) {
    this._wxToken = new WxToken(cfg);
  }
  /** ******************************   公有函数    ******************************** * */
  /**
   * 发送用户信息
   */
  public async sendUserMSG(postData: object, agentId: string) {
    // return this._wxToken.wxApiPost(
    //   'message/send',
    //   {
    //     access_token: this._wxToken.getLocalToken(agentId)
    //   },
    //   postData
    // );
  }
  /**
   * 上传图片资源
   */
  public async uploadMedia(formData: object, agentId: string) {
    // return this._wxToken.wxApiPost(
    //   'media/upload',
    //   {
    //     access_token: this._wxToken.getLocalToken(agentId),
    //     type: 'image'
    //   },
    //   formData,
    //   'postIMG'
    // );
  }
  /** ******************************   私有函数    ******************************** * */
}
