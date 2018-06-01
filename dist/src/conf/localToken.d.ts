import { IWX_CFG } from '../lib/def';
export default class LocalToken {
    /** ******************************   私有变量    ******************************** * */
    private _tokens;
    private _wxCfg;
    constructor(cfg: IWX_CFG);
    /** ******************************   公有函数    ******************************** * */
    /**
     * 获取缓存的accessToken
     */
    getLocalToken(agentid: string): string;
}
