import { IWX_CFG } from './def';
export default class WxLib {
    /** ******************************   私有变量    ******************************** * */
    private _wxToken;
    constructor(cfg: IWX_CFG);
    /** ******************************   公有函数    ******************************** * */
    /**
     * 发送用户信息
     */
    sendUserMSG(postData: object, agentId: string): Promise<void>;
    /**
     * 上传图片资源
     */
    uploadMedia(formData: object, agentId: string): Promise<void>;
}
