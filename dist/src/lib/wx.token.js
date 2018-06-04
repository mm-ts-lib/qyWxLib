"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by mq on 18-06-01.
 * 本地保存 access_token、jsapi_ticket
 * 写入文件中 {
 *  agentid, access_token、jsapi_ticket, expires过期时间
 * }
 * 每次启动时初始化本地记录，定时检测过期，
 */
const path_1 = require("path");
const debug_1 = require("debug");
const _d = debug_1.default('@tslib/qyWxLib:' + path_1.default.basename(__filename));
const lodash_1 = require("lodash");
const moment_1 = require("moment");
const tokensConf_1 = require("../conf/tokensConf");
class WxToken {
    constructor(cfg, wxHttp) {
        this._wxCfg = cfg;
        this._wxHttp = wxHttp;
        // 读取配置文件
        this._localTokens = tokensConf_1.default.tokens;
        this._initTokens();
        this._checkExpires();
    }
    /** ******************************   公有函数    ******************************** * */
    /**
     * 从微信服务器获取访问令牌
     * 获取不同应用的 access_Token
     */
    async get_Remote_Token(agentid) {
        const curAgentInfo = this._getCurAgentInfo(agentid);
        return new Promise(async (resolve, reject) => {
            if (lodash_1.default.isEmpty(curAgentInfo)) {
                reject({ message: `应用ID${agentid}不存在` });
                return;
            }
            try {
                const _wxGetRet_token = await this._wxHttp.wxApiGet('gettoken', {
                    corpid: curAgentInfo.corpId,
                    corpsecret: curAgentInfo.secret
                }, agentid);
                const _errcode_token = lodash_1.default.get(_wxGetRet_token, 'errcode');
                const _newToken = lodash_1.default.get(_wxGetRet_token, 'access_token');
                if (_errcode_token === 0) {
                    const _wxGetRet_ticket = await this._get_Remote_JsapiTicket(agentid, _newToken);
                    const _errcode_ticket = lodash_1.default.get(_wxGetRet_ticket, 'errcode');
                    if (_errcode_ticket === 0) {
                        this._setToken(agentid, _newToken, _wxGetRet_ticket.ticket, Math.min(_wxGetRet_token.expires_in, _wxGetRet_ticket.expires_in));
                    }
                    else {
                        _d('获取jsapi_ticket错误', _wxGetRet_ticket);
                    }
                }
                else {
                    _d('获取access_token错误', _wxGetRet_token);
                }
                resolve(_newToken);
            }
            catch (e) {
                _d('WX GET ACCESS_FAIL:', e);
                reject(e);
            }
        });
    }
    /**
     * 获取缓存的access_token
     */
    getLocalToken(agentid) {
        if (lodash_1.default.isString(agentid)) {
            const _retTokenObj = this._localTokens[agentid];
            if (_retTokenObj) {
                return _retTokenObj.access_token;
            }
        }
        // 其他返回默认值
        const _defaultAgentId = this._wxCfg.agents[0].agentid;
        return lodash_1.default.get(this._localTokens[_defaultAgentId], 'access_token');
    }
    /** ******************************   私有函数    ******************************** * */
    /*
     * 获取jsapi_ticket
     * */
    async _get_Remote_JsapiTicket(agentid, access_token) {
        return this._wxHttp.wxApiGet('get_jsapi_ticket', { access_token }, agentid);
    }
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
     * 记录tokens
     */
    _setToken(agentid, access_token, ticket, expires_in) {
        // 重新计算超时时间
        const _newExpires = new Date().getTime() + (expires_in - 1000) * 1000;
        lodash_1.default.set(this._localTokens, agentid, {
            agentid,
            access_token,
            ticket,
            expires: _newExpires
        });
    }
    /**
     * 定时检测是否过期
     */
    _initTokens() {
        // 遍历cfg文件
        lodash_1.default.forEach(this._wxCfg.agents, item => {
            if (lodash_1.default.isEmpty(this._localTokens[item.agentid])) {
                lodash_1.default.set(this._localTokens, item.agentid, {
                    agentid: item.agentid,
                    access_token: '',
                    ticket: '',
                    expires: 0
                });
            }
        });
    }
    async _checkExpires() {
        // _d('==============定时检测token', moment().format('HH:mm:ss'));
        const _curTimeMs = new Date().getTime();
        let _bRefreshData = false;
        // 遍历本地存储
        for (let key in this._localTokens) {
            const _curToken = this._localTokens[key];
            if (_curTimeMs > _curToken.expires) {
                // 超时，重新获取
                try {
                    _d('更新Token===============', moment_1.default().format('HH:mm:ss'));
                    await this.get_Remote_Token(key);
                    _bRefreshData = true;
                }
                catch (e) {
                    _d('更新Token出错', e);
                }
            }
        }
        if (_bRefreshData) {
            tokensConf_1.default.tokens = this._localTokens;
            tokensConf_1.default._save();
        }
        setTimeout(() => {
            this._checkExpires();
        }, 10 * 1000);
    }
}
exports.default = WxToken;
//# sourceMappingURL=wx.token.js.map