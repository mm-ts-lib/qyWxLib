import { IWX_CFG } from './def';
export default class WxHttp {
    /** ******************************   私有变量    ******************************** * */
    private _wxToken;
    constructor(cfg: IWX_CFG);
    /** ******************************   公有函数    ******************************** * */
    getLocalToken(agentid: string): string;
    /**
     *发送微信api Get请求
     * cmd：请求命令 ‘message/send‘
     * queryParam：请求url上所带参数,{access_token:self.accessToken} => ?access_token=xxx
     * callback：回调函数
     */
    wxApiGet(cmd: string, queryParam: object, agentid: string): Promise<any>;
    /**
     *发送微信api Post请求
     * cmd：请求命令 ‘message/send‘
     * queryParam：请求url上所带参数,{access_token:self.accessToken} => ?access_token=xxx
     * postData：post参数
     * callback：回调函数
     */
    wxApiPost(cmd: string, queryParam: object, postData: object, agentid: string, postType?: 'json' | 'formdata'): Promise<any>;
    /** ******************************   私有函数    ******************************** * */
    /** ******************************   WX GET POST    ******************************** * */
    /**
     * 解析返回的结果 json/string -> json
     */
    private _wxResBody_ToJson;
    /**
     * 返回request函数：type: get/post
     */
    private _getRequest;
    /**
     * 解析wx返回结果
     */
    private _parseWxRetBody;
    /**
     * WxHttPReq
     */
    private _wxHttpReq;
    /**
     * 重试
     */
    private _reqRetry;
}
