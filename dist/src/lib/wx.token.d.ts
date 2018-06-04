import WxHttp from './wx.http';
import { IWX_CFG } from './def';
export default class WxToken {
    /** ******************************   私有变量    ******************************** * */
    private _wxCfg;
    private _wxHttp;
    private _localTokens;
    constructor(cfg: IWX_CFG, wxHttp: WxHttp);
    /** ******************************   公有函数    ******************************** * */
    /**
     * 从微信服务器获取访问令牌
     * 获取不同应用的 access_Token
     */
    get_Remote_Token(agentid: string): Promise<string>;
    /**
     * 获取缓存的access_token
     */
    getLocalToken(agentid: string): string;
    /** ******************************   私有函数    ******************************** * */
    private _get_Remote_JsapiTicket(agentid, access_token);
    private _getCurAgentInfo(agentid);
    /**
     * 记录tokens
     */
    private _setToken(agentid, access_token, ticket, expires_in);
    /**
     * 定时检测是否过期
     */
    private _initTokens();
    private _checkExpires();
}
