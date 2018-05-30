import { IWX_CFG } from './def';
export default class WxToken {
    /** ******************************   私有变量    ******************************** * */
    private _tokens;
    private _wxCfg;
    constructor(cfg: IWX_CFG);
    /** ******************************   公有函数    ******************************** * */
    /**
     * 获取缓存的accessToken
     */
    getLocalToken(agentId: string): string;
    /**
     *发送微信api Get请求
     * cmd：请求命令 ‘message/send‘
     * queryParam：请求url上所带参数,{access_token:self.accessToken} => ?access_token=xxx
     * callback：回调函数
     */
    wxApiGet(cmd: string, queryParam: object, agentId: string): Promise<{}>;
    /**
     *发送微信api Post请求
     * cmd：请求命令 ‘message/send‘
     * queryParam：请求url上所带参数,{access_token:self.accessToken} => ?access_token=xxx
     * postData：post参数
     * callback：回调函数
     */
    /** ******************************   私有函数    ******************************** * */
    private _getCurAgentInfo(agentId);
    /**
     * 从微信服务器获取访问令牌
     * 获取不同应用的 accessToken
     * @param cb 成功后的回调函数,原型:function(err,accessToken)
     */
    private _getRemoteToken(agentId);
}
