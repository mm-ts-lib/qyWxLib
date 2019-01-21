"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by mq on 18-05-30.
 * 发送wx应用消息
 */
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const _d = debug_1.default('@tslib/qyWxLib:' + path_1.default.basename(__filename));
class WxMsg {
    constructor(wxHttp) {
        this._wxHttp = wxHttp;
    }
    /** ******************************   公有函数    ******************************** * */
    /**
     * 发送文本消息
     */
    async sendText(agentid, content, touser, toparty, totag) {
        return this._wxHttp.wxApiPost('message/send', {
            access_token: this._wxHttp.getLocalToken(agentid),
        }, {
            touser,
            toparty,
            totag,
            msgtype: 'text',
            agentid,
            text: { content },
            safe: 0,
        }, agentid);
    }
    /**
     * 发送图片消息
     */
    async sendImage(agentid, media_id, touser, toparty, totag) {
        return this._wxHttp.wxApiPost('message/send', {
            access_token: this._wxHttp.getLocalToken(agentid),
        }, {
            touser,
            toparty,
            totag,
            msgtype: 'image',
            agentid,
            image: { media_id },
            safe: 0,
        }, agentid);
    }
    /**
     * 发送图文消息
     */
    async sendArticles(agentid, articles, touser, toparty, totag) {
        if (articles.length > 8) {
            throw new Error('一个图文消息支持1到8条图文');
        }
        return this._wxHttp.wxApiPost('message/send', {
            access_token: this._wxHttp.getLocalToken(agentid),
        }, {
            touser,
            toparty,
            totag,
            msgtype: 'news',
            agentid,
            news: {
                articles,
            },
        }, agentid);
    }
}
exports.default = WxMsg;
//# sourceMappingURL=wx.msg.js.map