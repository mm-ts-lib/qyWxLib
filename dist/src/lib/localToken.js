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
const tokensConf_1 = __importDefault(require("../conf/tokensConf"));
class WxToken {
    constructor(cfg, wxHttp) {
        this._wxCfg = cfg;
        this._wxHttp = wxHttp;
        // 读取配置文件
        this._localTokens = tokensConf_1.default.tokens;
    }
    /** ******************************   公有函数    ******************************** * */
    /**
     * 从微信服务器获取访问令牌
     * 获取不同应用的 accessToken
     */
    async getRemoteToken(agentid) {
        const curAgentInfo = this._getCurAgentInfo(agentid);
        return new Promise(async (resolve, reject) => {
            if (lodash_1.default.isEmpty(curAgentInfo)) {
                reject({ message: `应用ID${agentid}不存在` });
                return;
            }
            try {
                const _wxGetRet = await this._wxHttp.wxApiGet('gettoken', {
                    corpid: curAgentInfo.corpId,
                    corpsecret: curAgentInfo.secret
                }, agentid);
                _d('WX GET ACCESS:', typeof _wxGetRet, _wxGetRet);
                const _aToken = lodash_1.default.get(_wxGetRet, 'access_token');
                if (lodash_1.default.isString(curAgentInfo.agentid)) {
                    // 记录新的token
                    await this._saveLocalToken(curAgentInfo.agentid);
                    // this._tokens[curAgentInfo.agentid] = _aToken;
                }
                resolve(_aToken);
            }
            catch (e) {
                _d('WX GET ACCESS_FAIL:', e);
                reject(e);
            }
        });
    }
    /**
     * 获取缓存的accessToken
     */
    getLocalToken(agentid) {
        _d('1111111111111111', agentid, this._localTokens);
        if (lodash_1.default.isString(agentid)) {
            const _retTokenObj = this._localTokens[agentid];
            if (_retTokenObj) {
                return _retTokenObj.accesstoken;
            }
        }
        _d('22222222222222222', this._wxCfg.agents[0].agentid);
        // 其他返回默认值
        const _defaultAgentId = this._wxCfg.agents[0].agentid;
        return lodash_1.default.get(this._localTokens[_defaultAgentId], 'accesstoken');
    }
    /** ******************************   私有函数    ******************************** * */
    /*
     * 查找当前应用配置信息
     * */
    _getCurAgentInfo(agentid) {
        let curAgent;
        if (!lodash_1.default.isString(agentid)) {
            curAgent = this._wxCfg.agents[0];
        }
        else {
            // 先查找当前应用配置信息
            curAgent = lodash_1.default.find(this._wxCfg.agents, o => o.agentid === agentid);
            if (lodash_1.default.isUndefined(curAgent)) {
                curAgent = this._wxCfg.agents[0]; // 默认
            }
        }
        if (lodash_1.default.isUndefined(curAgent)) {
            // 未找到
            return {};
        }
        return {
            agentid,
            corpId: this._wxCfg.corpId,
            secret: curAgent.secret
        };
    }
    /**
     * 保存本地accessToken
     */
    async _saveLocalToken(agentid) { }
}
exports.default = WxToken;
//# sourceMappingURL=localToken.js.map