import WxHttp from './wx.http';
import { IWX_MSG_RES } from './def';
export default class WxMsg {
    /** ******************************   私有变量    ******************************** * */
    private _wxHttp;
    constructor(wxHttp: WxHttp);
    /** ******************************   公有函数    ******************************** * */
    /**
     * 发送文本消息
     */
    sendText(agentid: string, content: string, touser?: string, toparty?: string, totag?: string): Promise<IWX_MSG_RES>;
    /**
     * 发送图片消息
     */
    sendImage(agentid: string, media_id: string, touser?: string, toparty?: string, totag?: string): Promise<IWX_MSG_RES>;
}
