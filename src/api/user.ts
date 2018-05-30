import { HTTP, IAPI } from '@tslib/webapi';

// wx登录用户信息数据结构
export interface IUser {
  name: string; // 用户名，英文或者id
  // displayName: string; // 用户显示名
  // loginTime: Date; // 登录时间
  // permissions: ['admin' | 'guest' | 'user' | 'developer']; // 用户基础权限组
  // fromIp: string; // 来源IP
  // avatar: string; // base64编码的用户头像
  // loginErrorCount: number; //  登录错误计数器，超出一定数量将被锁定
  // blackIp: string[]; // 登录黑名单
}

export const userApi = {
  // 恢复登录，尝试恢复当前登录的会话信息
  // 如无法恢复，则返回一个key，用于下一步进行login使用的临时码
  check: HTTP<
    { url: string; usercode: string; agentid: string },
    | { user: IUser }
    | {
        err: 'AUTH' | 'WX AUTH ERROR';
        redirect: string;
      }
  >()
};
