import { IConfig } from '@tslib/conf';
export interface ILOCAL_TOKENS {
    [Name: string]: {
        agentid: string;
        access_token: string;
        ticket: string;
        expires: number;
    };
}
declare const _default: {
    tokens: ILOCAL_TOKENS;
} & IConfig;
export default _default;
