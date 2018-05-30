import WxLib from './lib/wx.lib';
import WxMsg from './lib/wx.msg';
import { IWX_CFG } from './lib/def';
import './router/api';
import api from './api';
export { api };
export declare class WX {
    /** ******************************   私有变量    ******************************** * */
    private _wxLib?;
    constructor();
    /** ******************************   对外接口    ******************************** * */
    createWx(wxCfg: IWX_CFG): void;
    getWxLib(): WxLib;
    getWxMsg(): WxMsg;
}
declare const _default: WX;
export default _default;
