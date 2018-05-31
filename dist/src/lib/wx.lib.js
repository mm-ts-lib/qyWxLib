"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by mq on 18-05-30.
 * wx内部逻辑
 */
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const _d = debug_1.default('@tslib/qyWxLib:' + path_1.default.basename(__filename));
const wx_token_1 = __importDefault(require("./wx.token"));
const wx_msg_1 = __importDefault(require("./wx.msg"));
const url_1 = __importDefault(require("url"));
class WxLib {
    constructor(cfg) {
        this._wxCfg = cfg;
        this._wxToken = new wx_token_1.default(cfg);
        this._wxMsg = new wx_msg_1.default(this._wxToken);
    }
    /** ******************************   公有函数    ******************************** * */
    getWxMsg() {
        return this._wxMsg;
    }
    /**
     * 构建微信认证进行跳转的url,去除url的所有请求参数,执行跳转认证
     * @param reqUrl 请求的url
     * @returns {string} 拼接的微信认证url字符串
     */
    makeWeixinAuthUrl(reqUrl) {
        //去除url的code,stat参数
        const u1 = url_1.default.parse(reqUrl, true);
        _d('AUTH URL:================================', u1);
        const u = u1.protocol + '//' + u1.host + u1.pathname;
        //否则通知进行跳转,获取用户code
        const wxurl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this._wxCfg.corpId}&redirect_uri=${encodeURIComponent(u)}&response_type=code&scope=snsapi_base&wxurl=zf#wechat_redirect`;
        return url_1.default.format(wxurl);
    }
    /**
     * 通过code获取用户信息
     * @param code
     * @param agentid
     */
    userFromCode(code, agentid) {
        return this._wxToken.wxApiGet('user/getuserinfo', { access_token: this._wxToken.getLocalToken(agentid), code }, agentid);
    }
    /**
     * 通过id获取用户信息
     * @param userid
     * @param agentid
     */
    getUserInfoById(userid, agentid) {
        return this._wxToken.wxApiGet('user/get', { access_token: this._wxToken.getLocalToken(agentid), userid }, agentid);
    }
    /**
     * 上传临时素材
     */
    async uploadTempSrc(fileStream, agentid, type) {
        return this._wxToken.wxApiPost('media/upload', { access_token: this._wxToken.getLocalToken(agentid), type }, { media: fileStream }, agentid, 'postIMG');
    }
}
exports.default = WxLib;
//# sourceMappingURL=wx.lib.js.map