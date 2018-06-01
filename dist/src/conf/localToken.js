"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by mq on 18-06-01.
 * 本地保存 accesstoken、jsapi_ticket
 * 写入文件中 {
 *  agentid, accesstoken、jsapi_ticket, expires过期时间
 * }
 * 每次启动时初始化本地记录，定时检测过期，
 */
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const _d = debug_1.default('@tslib/qyWxLib:' + path_1.default.basename(__filename));
const lodash_1 = __importDefault(require("lodash"));
class LocalToken {
    constructor(cfg) {
        /** ******************************   私有变量    ******************************** * */
        this._tokens = {}; // 分应用存储
        this._wxCfg = cfg;
    }
    /** ******************************   公有函数    ******************************** * */
    /**
     * 获取缓存的accessToken
     */
    getLocalToken(agentid) {
        if (lodash_1.default.isString(agentid)) {
            const _retToken = this._tokens[agentid];
            if (_retToken) {
                return _retToken;
            }
        }
        // 其他返回默认值
        const _defaultAgentId = this._wxCfg.agents[0].agentid;
        return this._tokens[_defaultAgentId];
    }
}
exports.default = LocalToken;
//# sourceMappingURL=localToken.js.map