import WxLib from './lib/wx.lib';
import { IWX_CFG } from './lib/def';
export declare class WX {
    /** ******************************   私有变量    ******************************** * */
    private _wxLib;
    constructor();
    /** ******************************   对外接口    ******************************** * */
    createWx(wxCfg: IWX_CFG): void;
    getWxLib(): WxLib;
}
declare const _default: WX;
export default _default;
