import WxLib from './lib/wx.lib';
import WxMsg from './lib/wx.msg';
import WxUser from './lib/wx.user';
import WxTxl from './wsTxl';
import { IWX_CFG } from './lib/def';
export declare class WX {
    /** ******************************   私有变量    ******************************** * */
    private _wxLib?;
    private _wxTxl?;
    constructor();
    /** ******************************   对外接口    ******************************** * */
    createWx(wxCfg: IWX_CFG): void;
    getWxLib(): WxLib;
    getWxMsg(): WxMsg;
    getWxUser(): WxUser;
    getWxTxl(): WxTxl;
}
declare const _default: WX;
export default _default;
