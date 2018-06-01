"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by mq on 18-05-30.
 * accessToken管理
 */
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const _d = debug_1.default('@tslib/qyWxLib:' + path_1.default.basename(__filename));
const lodash_1 = __importDefault(require("lodash"));
const request_promise_1 = __importDefault(require("request-promise"));
const querystring_1 = __importDefault(require("querystring"));
const wx_token_1 = __importDefault(require("./wx.token"));
class WxHttp {
    constructor(cfg) {
        this._wxToken = new wx_token_1.default(cfg, this);
    }
    /** ******************************   公有函数    ******************************** * */
    // public getWxToken() {
    //   return this._wxToken;
    // }
    getLocalToken(agentid) {
        return this._wxToken.getLocalToken(agentid);
    }
    /**
     *发送微信api Get请求
     * cmd：请求命令 ‘message/send‘
     * queryParam：请求url上所带参数,{access_token:self.accessToken} => ?access_token=xxx
     * callback：回调函数
     */
    async wxApiGet(cmd, queryParam, agentid) {
        return this._reqRetry(3, {
            reqType: 'GET',
            cmd,
            queryParam,
            agentid,
            reqData: {}
        });
    }
    /**
     *发送微信api Post请求
     * cmd：请求命令 ‘message/send‘
     * queryParam：请求url上所带参数,{access_token:self.accessToken} => ?access_token=xxx
     * postData：post参数
     * callback：回调函数
     */
    async wxApiPost(cmd, queryParam, postData, agentid, postType) {
        // 组装post请求数据
        let _reqData = { url: '' };
        if (lodash_1.default.isEmpty(postType)) {
            _reqData = Object.assign(_reqData, {
                headers: {
                    'Content-type': 'application/json'
                },
                json: postData
            });
        }
        else {
            // postType用来指定调用xml请求时
            _reqData = Object.assign(_reqData, {
                formData: postData
            });
        }
        return this._reqRetry(3, {
            reqType: 'POST',
            cmd,
            queryParam,
            agentid,
            reqData: _reqData
        });
    }
    /** ******************************   私有函数    ******************************** * */
    /** ******************************   WX GET POST    ******************************** * */
    /**
     * 解析返回的结果 json/string -> json
     */
    async _wxResBody_ToJson(wxRet) {
        return new Promise((resolve, reject) => {
            if (lodash_1.default.isString(wxRet)) {
                try {
                    // 防止json解析出错
                    resolve(JSON.parse(wxRet));
                }
                catch (e) {
                    reject({ message: `wxRet：${wxRet} NOT JSON` });
                    return;
                }
            }
            resolve(wxRet);
        });
    }
    /**
     * 返回request函数：type: get/post
     */
    async _getRequest(reqType, reqData) {
        if (reqType === 'POST') {
            return request_promise_1.default.post(reqData);
        }
        return request_promise_1.default.get(reqData);
    }
    /**
     * 解析wx返回结果
     */
    async _parseWxRetBody(resBody, agentid) {
        return new Promise(async (resolve, reject) => {
            try {
                // get请求只返回string, post返回json/string
                const json = await this._wxResBody_ToJson(resBody);
                // 检测accessToken错误,发现错误后重新获取accessToken,然后重试
                const _errCode = lodash_1.default.get(json, 'errcode');
                switch (_errCode) {
                    case 0:
                        resolve(json); // 成功调用
                        // resolve({ errcode: 'retry', newToken: '11111' });
                        break;
                    case 40014: // 不合法的access_token
                    case 41001: // 缺少access_token参数
                    case 42001: // access_token已过期, access_token有时效性，需要重新获取一次
                        {
                            // {"errcode":41001,"errmsg":"access_token missing"}
                            // 重试获取access_token,然后重新设置accesstoken,重新发起请求
                            const newToken = await this._wxToken.get_Remote_Token(agentid);
                            resolve({ errcode: 'retry', newToken });
                        }
                        break;
                    case 40029: // 不合法的oauth_code
                        resolve({ errcode: 'invalid oauth_code' }); // 直接返回错误信息
                        break;
                    default:
                        // 改版之后，返回结果中必定存在 errcode errmsg
                        reject({ message: `json.errcode:${_errCode}` });
                        break;
                }
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /**
     * WxHttPReq
     */
    async _wxHttpReq(reqType, cmd, queryParam, agentid, reqData, newToken) {
        // 成功更新accessToken //注：access_token在queryParam中
        if (!lodash_1.default.isEmpty(newToken)) {
            lodash_1.default.set(queryParam, 'access_token', newToken);
        }
        return new Promise(async (resolve, reject) => {
            try {
                let _newUrl = `https://qyapi.weixin.qq.com/cgi-bin/${cmd}?${querystring_1.default.stringify(queryParam)}`;
                lodash_1.default.set(reqData, 'url', _newUrl);
                // 当access_token无效时，需要从新赋值，故需要querystring.stringify
                // const _tmpReqData = _.clone(reqData);
                const _resBody = await this._getRequest(reqType, reqData);
                const _json = await this._parseWxRetBody(_resBody, agentid);
                resolve(_json);
            }
            catch (e) {
                reject(e); // 获取accessToken错误 + JSON.parse错误
            }
        });
    }
    /**
     * 重试
     */
    async _reqRetry(retryTimes, reqParams) {
        return new Promise((resolve, reject) => {
            const _attemptFn = async (newToken) => {
                try {
                    if (retryTimes <= 0) {
                        reject({ message: 'Retry to Update AccessToken 3 times' });
                    }
                    else {
                        const _postRet = await this._wxHttpReq(reqParams.reqType, reqParams.cmd, reqParams.queryParam, reqParams.agentid, reqParams.reqData, newToken);
                        const _errcode = lodash_1.default.get(_postRet, 'errcode');
                        if (_errcode === 'retry') {
                            newToken = lodash_1.default.get(_postRet, 'newToken');
                            _d('+++++++++++++++++wxApiPost retry:', retryTimes);
                            retryTimes -= 1;
                            _attemptFn(newToken); // 重试
                        }
                        else {
                            resolve(_postRet);
                        }
                    }
                }
                catch (e) {
                    reject(e);
                }
            };
            _attemptFn('');
        });
    }
}
exports.default = WxHttp;
// export default new Token();
//# sourceMappingURL=wx.http.js.map