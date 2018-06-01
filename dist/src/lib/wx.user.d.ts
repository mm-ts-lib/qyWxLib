import WxHttp from './wx.http';
import { IWX_USER_INFO } from './def';
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
    /**
     * 通过id获取用户信息
     * @param userid
     * @param agentid
     */
    getUserInfoById(userid: string, agentid: string): Promise<IWX_USER_INFO>;
}
