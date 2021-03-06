"use strict";
/**
 * Created by mq on 18-05-30.
 * 发送wx应用消息
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const _d = debug_1.default('@tslib/qyWxLib:' + path_1.default.basename(__filename));
class WxUser {
    constructor(wxHttp) {
        this._wxHttp = wxHttp;
    }
    /** ******************************   公有函数    ******************************** * */
    /**
     * 通过code获取用户信息
     * @param code
     * @param agentid
     */
    async userFromCode(code, agentid) {
        return this._wxHttp.wxApiGet('user/getuserinfo', { access_token: this._wxHttp.getLocalToken(agentid), code }, agentid);
    }
}
exports.default = WxUser;
//# sourceMappingURL=wx.user.js.map