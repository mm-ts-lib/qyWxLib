import WxHttp from './wx.http';
export default class WxUser {
    /** ******************************   私有变量    ******************************** * */
    private _wxHttp;
    constructor(wxHttp: WxHttp);
    /** ******************************   公有函数    ******************************** * */
    /**
     * 通过code获取用户信息
     * @param code
     * @param agentid
     */
    userFromCode(code: string, agentid: string): Promise<{
        UserId: string;
        errcode: 'invalid oauth_code';
    }>;
}
