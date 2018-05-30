/**
 * Created by mq on 18-05-30.
 * 企业微信库主接口
 */
import path from 'path';
import debug from 'debug';
const _d = debug('@tslib/qyWxLib:' + path.basename(__filename));

import WxLib from './lib/wx.lib';
import { IWX_CFG } from './lib/def';

export class WX {
  /** ******************************   私有变量    ******************************** * */
  private _wxLib: WxLib | null = null;
  constructor() {}
  /** ******************************   对外接口    ******************************** * */
  // 根据配置文件生成wx内部函数
  public createWx(wxCfg: IWX_CFG) {
    this._wxLib = new WxLib(wxCfg);
  }
  public getWxLib() {
    if (this._wxLib === null) throw new Error('WxLib Invalid!!');
    return this._wxLib;
  }
  /** ******************************   私有函数    ******************************** * */
}

export default new WX();
