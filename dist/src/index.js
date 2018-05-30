"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by mq on 18-05-30.
 * 企业微信库主接口
 */
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const _d = debug_1.default('@tslib/qyWxLib:' + path_1.default.basename(__filename));
const wx_lib_1 = __importDefault(require("./lib/wx.lib"));
class WX {
    constructor() {
        /** ******************************   私有变量    ******************************** * */
        this._wxLib = null;
    }
    /** ******************************   对外接口    ******************************** * */
    // 根据配置文件生成wx内部函数
    createWx(wxCfg) {
        this._wxLib = new wx_lib_1.default(wxCfg);
    }
    getWxLib() {
        if (this._wxLib === null)
            throw new Error('WxLib Invalid!!');
        return this._wxLib;
    }
}
exports.WX = WX;
exports.default = new WX();
//# sourceMappingURL=index.js.map