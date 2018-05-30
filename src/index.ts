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
import { IWX_CFG } from './lib/def';

// 导入Api路由
import './router/api';
import api from './api';
export { api };

export class WX {
  /** ******************************   私有变量    ******************************** * */
  private _wxLib?: WxLib;

  constructor() {}
  /** ******************************   对外接口    ******************************** * */
  // 根据配置文件生成wx内部函数
  public createWx(wxCfg: IWX_CFG) {
    this._wxLib = new WxLib(wxCfg);
  }
  public getWxLib() {
    if (_.isUndefined(this._wxLib)) throw new Error('WxLib Invalid!!');
    return this._wxLib;
  }
  public getWxMsg() {
    if (_.isUndefined(this._wxLib)) throw new Error('WxLib Invalid!!');
    return this._wxLib.getWxMsg();
  }
  /** ******************************   私有函数    ******************************** * */
}

export default new WX();
