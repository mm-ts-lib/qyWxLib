import { IUser } from '../api/user';
export interface IUserSession extends Express.Session {
    user: IUser;
}
/**
 * 获取会话
 * @param data 传入数据
 */
export declare const getSession: (data: any) => IUserSession;
