/**
 * Created by mq on 18-05-30.
 * 公共类型定义
 */
export interface IWX_CFG {
    corpId: string;
    agents: Array<{
        agentid: string;
        secret: string;
    }>;
    apps: {
        [Name: string]: {
            agentid: string;
            entToken: string;
            encodingAESKey: string;
        };
    };
}
export interface IWX_USER_INFO {
    errcode: number;
    errmsg: string;
    userid: string;
    name: string;
    department: Array<number>;
    mobile: string;
    enable: number;
}
export interface IWX_MSG_RES {
    errcode: number;
    errmsg: string;
    invaliduser?: string;
    invalidparty?: string;
    invalidtag?: string;
}
