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
     * 获取不同应用的 accessToken
     */
    getRemoteToken(agentid: string): Promise<{}>;
    /**
     * 获取缓存的accessToken
     */
    getLocalToken(agentid: string): string;
    /** ******************************   私有函数    ******************************** * */
    private _getCurAgentInfo(agentid);
    /**
     * 保存本地accessToken
     */
    private _saveLocalToken(agentid);
}
