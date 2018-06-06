export declare const TXL_AGENT_ID = "txl";
export interface IWX_USER_INFO {
    errcode: number;
    errmsg: string;
    userid: string;
    name: string;
    department: Array<number>;
    mobile: string;
    enable: number;
}
export interface IWX_DEPT_INFO {
    id: number;
    name: string;
    parentid: number;
}
