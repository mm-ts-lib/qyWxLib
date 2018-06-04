import WxHttp from '../lib/wx.http';
import { IWX_USER_INFO } from './txlDef';
export default class UserMgt {
    /** ******************************   私有变量    ******************************** * */
    private _wxHttp;
    constructor(wxHttp: WxHttp);
    /** ******************************   公有函数    ******************************** * */
    /**
     * 通过id获取用户信息
     * @param userid
     * @param agentid
     */
    getUserInfoById(userid: string): Promise<IWX_USER_INFO>;
    /**
   * 通过id获取用户信息
   * @param userid
   * @param agentid
   */
    getOpenIdByUserId(userid: string): Promise<IWX_USER_INFO>;
    userCreate(wxId: string, userName: string, userMobile: string, deptId: number): Promise<{
        errcode: number;
    }>;
    userUpdate(wxId: string, userName: string, deptIdArr: Array<number>): Promise<{
        errcode: number;
    }>;
    userDel(userIdArr: Array<string>): Promise<{
        errcode: number;
    }>;
    userSimpleList(deptId: number, fetchChild?: 0 | 1): Promise<{
        userlist: Array<{
            userid: string;
            name: string;
            department: Array<number>;
        }>;
    }>;
    userList(deptId: number, fetchChild?: 0 | 1): Promise<{
        userlist: Array<IWX_USER_INFO>;
    }>;
}
