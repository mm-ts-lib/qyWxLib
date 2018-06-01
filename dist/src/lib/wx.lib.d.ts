/// <reference types="node" />
import WxMsg from './wx.msg';
import WxUser from './wx.user';
import { IWX_CFG } from './def';
import { ReadStream } from 'tty';
export default class WxLib {
    /** ******************************   私有变量    ******************************** * */
    private _wxCfg;
    private _wxHttp;
    private _wxMsg;
    private _wxUser;
    constructor(cfg: IWX_CFG);
    /** ******************************   公有函数    ******************************** * */
    getWxMsg(): WxMsg;
    getWxUser(): WxUser;
    /**
     * 构建微信认证进行跳转的url,去除url的所有请求参数,执行跳转认证
     * @param reqUrl 请求的url
     * @returns {string} 拼接的微信认证url字符串
     */
    makeWeixinAuthUrl(reqUrl: string): string;
    /**
     * 上传临时素材
     */
    uploadTempSrc(fileStream: ReadStream, agentid: string, type: 'image' | 'voice' | 'video' | 'file'): Promise<{
        errcode: number;
        errmsg: string;
        type: 'image' | 'voice' | 'video' | 'file';
        media_id: string;
    }>;
}
