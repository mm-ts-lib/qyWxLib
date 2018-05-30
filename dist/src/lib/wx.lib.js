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
class WxLib {
    constructor(cfg) {
        this._wxToken = new wx_token_1.default(cfg);
    }
    /** ******************************   公有函数    ******************************** * */
    /**
     * 发送用户信息
     */
    async sendUserMSG(postData, agentId) {
        return this._wxToken.wxApiPost('message/send', {
            access_token: this._wxToken.getLocalToken(agentId)
        }, postData, agentId);
    }
    /**
     * 上传图片资源
     */
    async uploadMedia(formData, agentId) {
        return this._wxToken.wxApiPost('media/upload', {
            access_token: this._wxToken.getLocalToken(agentId),
            type: 'image'
        }, formData, agentId, 'postIMG');
    }
}
exports.default = WxLib;
//# sourceMappingURL=wx.lib.js.map