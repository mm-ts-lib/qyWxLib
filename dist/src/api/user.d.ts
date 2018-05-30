import { IAPI } from '@tslib/webapi';
export interface IUser {
    name: string;
}
export declare const userApi: {
    check: IAPI<{
        url: string;
        usercode: string;
        agentid: string;
    }, {
        user: IUser;
    } | {
        err: "AUTH" | "WX AUTH ERROR";
        redirect: string;
    }>;
};
