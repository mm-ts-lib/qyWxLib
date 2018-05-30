import { IAPI } from '@tslib/webapi';
import { IUser } from './user';
declare const _default: {
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
export default _default;
