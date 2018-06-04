"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by mq on 18-05-30.
 * 企业微信库主接口
 */
const path_1 = require("path");
const debug_1 = require("debug");
const _d = debug_1.default('@tslib/qyWxLib:' + path_1.default.basename(__filename));
const lodash_1 = require("lodash");
const wx_lib_1 = require("./lib/wx.lib");
class WX {
    constructor() { }
    /** ******************************   对外接口    ******************************** * */
    // 根据配置文件生成wx内部函数
    createWx(wxCfg) {
        this._wxLib = new wx_lib_1.default(wxCfg);
    }
    getWxLib() {
        if (lodash_1.default.isUndefined(this._wxLib))
            throw new Error('WxLib Invalid!!');
        return this._wxLib;
    }
    getWxMsg() {
        if (lodash_1.default.isUndefined(this._wxLib))
            throw new Error('WxLib Invalid!!');
        return this._wxLib.getWxMsg();
    }
    getWxUser() {
        if (lodash_1.default.isUndefined(this._wxLib))
            throw new Error('WxLib Invalid!!');
        return this._wxLib.getWxUser();
    }
}
exports.WX = WX;
exports.default = new WX();
//# sourceMappingURL=index.js.map