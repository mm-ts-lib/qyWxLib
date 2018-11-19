import WxHttp from '../lib/wx.http';
import UserMgt from './userMgt';
import DeptMgt from './deptMgt';
export default class WxTxl {
    /** ******************************   私有变量    ******************************** * */
    private _wxHttp;
    private _userMgt;
    private _deptMgt;
    constructor(wxHttp: WxHttp);
    /** ******************************   公有函数    ******************************** * */
    getUserMgt(): UserMgt;
    getDeptMgt(): DeptMgt;
}
