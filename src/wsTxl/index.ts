/**
 * Created by mq on 18-05-30.
 * 企业微信通信录接口
 */
import path from 'path';
import debug from 'debug';
const _d = debug('@tslib/qyWxLib:' + path.basename(__filename));

import WxHttp from '../lib/wx.http';
import UserMgt from './userMgt';
import DeptMgt from './deptMgt';

export default class WxTxl {
  /** ******************************   私有变量    ******************************** * */
  private _wxHttp: WxHttp;
  private _userMgt: UserMgt;
  private _deptMgt: DeptMgt;

  constructor(wxHttp: WxHttp) {
    this._wxHttp = wxHttp;
    this._userMgt = new UserMgt(wxHttp);
    this._deptMgt = new DeptMgt(wxHttp);
  }
  /** ******************************   公有函数    ******************************** * */
  getUserMgt() {
    return this._userMgt;
  }
  getDeptMgt() {
    return this._deptMgt;
  }

  /** ******************************   私有函数    ******************************** * */
}
