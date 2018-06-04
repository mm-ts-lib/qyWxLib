"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by mq on 18-05-30.
 * wx内部逻辑
 */
const path_1 = require("path");
const debug_1 = require("debug");
const _d = debug_1.default('@tslib/qyWxLib:' + path_1.default.basename(__filename));
const lodash_1 = require("lodash");
const querystring_1 = require("querystring");
const wx_http_1 = require("./wx.http");
const wx_msg_1 = require("./wx.msg");
const wx_user_1 = require("./wx.user");
const url_1 = require("url");
class WxLib {
    constructor(cfg) {
        this._wxCfg = cfg;
        this._wxHttp = new wx_http_1.default(cfg);
        this._wxMsg = new wx_msg_1.default(this._wxHttp);
        this._wxUser = new wx_user_1.default(this._wxHttp);
    }
    /** ******************************   公有函数    ******************************** * */
    getWxMsg() {
        return this._wxMsg;
    }
    getWxUser() {
        return this._wxUser;
    }
    getWxHttp() {
        return this._wxHttp;
    }
    /**
     * 构建微信认证进行跳转的url,去除url的所有请求参数,执行跳转认证
     * @param reqUrl 请求的url
     * @returns {string} 拼接的微信认证url字符串
     */
    makeWeixinAuthUrl(reqUrl) {
        const u1 = url_1.default.parse(reqUrl, true);
        //去除url的code,stat参数
        let u = `${u1.protocol}//${u1.host}${u1.pathname}`;
        if (!lodash_1.default.isEmpty(u1.query)) {
            delete u1.query['code'];
            if (!lodash_1.default.isEmpty(u1.query)) {
                // 判断删除code之后还有无参数
                const newSearchStr = querystring_1.default.stringify(u1.query);
                u = `${u1.protocol}//${u1.host}${u1.pathname}?${newSearchStr}`;
            }
        }
        //否则通知进行跳转,获取用户code
        const wxurl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this._wxCfg.corpId}&redirect_uri=${encodeURIComponent(u)}&response_type=code&scope=snsapi_base&wxurl=zf#wechat_redirect`;
        return url_1.default.format(wxurl);
    }
    /**
     * 上传临时素材
     */
    async uploadTempSrc(fileStream, agentid, type) {
        return this._wxHttp.wxApiPost('media/upload', { access_token: this._wxHttp.getLocalToken(agentid), type }, { media: fileStream }, agentid, 'formdata');
    }
}
exports.default = WxLib;
//# sourceMappingURL=wx.lib.js.map