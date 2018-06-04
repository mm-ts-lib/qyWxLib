"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by mq on 18-05-30.
 * 企业微信通信录接口
 */
const path_1 = require("path");
const debug_1 = require("debug");
const _d = debug_1.default('@tslib/qyWxLib:' + path_1.default.basename(__filename));
const UserMgt_1 = require("./UserMgt");
const DeptMgt_1 = require("./DeptMgt");
class WxTxl {
    constructor(wxHttp) {
        this._wxHttp = wxHttp;
        this._userMgt = new UserMgt_1.default(wxHttp);
        this._deptMgt = new DeptMgt_1.default(wxHttp);
    }
    /** ******************************   公有函数    ******************************** * */
    getUserMgt() {
        return this._userMgt;
    }
    getDeptMgt() {
        return this._deptMgt;
    }
}
exports.default = WxTxl;
//# sourceMappingURL=index.js.map