import WxMsg from './wx.msg';
import { IWX_CFG, IWX_USER_INFO } from './def';
export default class WxLib {
    /** ******************************   私有变量    ******************************** * */
    private _wxCfg;
    private _wxToken;
    private _wxMsg;
    constructor(cfg: IWX_CFG);
    /** ******************************   公有函数    ******************************** * */
    getWxMsg(): WxMsg;
    /**
     * 构建微信认证进行跳转的url,去除url的所有请求参数,执行跳转认证
     * @param reqUrl 请求的url
     * @returns {string} 拼接的微信认证url字符串
     */
    makeWeixinAuthUrl(reqUrl: string): string;
    /**
     * 通过code获取用户信息
     * @param code
     * @param agentid
     */
    userFromCode(code: string, agentid: string): Promise<any>;
    /**
     * 通过id获取用户信息
     * @param userid
     * @param agentid
     */
    getUserInfoById(userid: string, agentid: string): Promise<IWX_USER_INFO>;
    /**
     * 上传图片资源
     */
    uploadMedia(formData: object, agentid: string): Promise<any>;
}
