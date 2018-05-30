import { Express } from 'express';
import { IUser } from '../api/user';

export interface IUserSession extends Express.Session {
  user: IUser;
  // login: {
  //   key: string;
  // };
}

/**
 * 获取会话
 * @param data 传入数据
 */
export const getSession = (data: any): IUserSession => {
  return data._session;
};
