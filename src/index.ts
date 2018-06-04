/**
 * Created by mq on 18-05-30.
 * 企业微信库主接口
 */
import path from 'path';
import debug from 'debug';
const _d = debug('@tslib/qyWxLib:' + path.basename(__filename));

import _ from 'lodash';
import WxLib from './lib/wx.lib';
import WxMsg from './lib/wx.msg';
import WxUser from './lib/wx.user';
import WxTxl from './wsTxl';
import { IWX_CFG } from './lib/def';

export class WX {
  /** ******************************   私有变量    ******************************** * */
  private _wxLib?: WxLib;
  private _wxTxl?: WxTxl;

  constructor() {}
  /** ******************************   对外接口    ******************************** * */
  // 根据配置文件生成wx内部函数
  public createWx(wxCfg: IWX_CFG) {
    this._wxLib = new WxLib(wxCfg);
    this._wxTxl = new WxTxl(this._wxLib.getWxHttp());
  }
  public getWxLib() {
    if (_.isUndefined(this._wxLib)) throw new Error('WxLib Invalid!!');
    return this._wxLib;
  }
  public getWxMsg() {
    if (_.isUndefined(this._wxLib)) throw new Error('WxLib Invalid!!');
    return this._wxLib.getWxMsg();
  }
  public getWxUser() {
    if (_.isUndefined(this._wxLib)) throw new Error('WxLib Invalid!!');
    return this._wxLib.getWxUser();
  }
  public getWxTxl() {
    if (_.isUndefined(this._wxTxl)) throw new Error('WxTxl Invalid!!');
    return this._wxTxl;
  }
  /** ******************************   私有函数    ******************************** * */
}

export default new WX();
