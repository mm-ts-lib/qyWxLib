import WxHttp from '../lib/wx.http';
export default class UserMgt {
    /** ******************************   私有变量    ******************************** * */
    private _wxHttp;
    constructor(wxHttp: WxHttp);
    /** ******************************   公有函数    ******************************** * */
    userCreate(wxId: string, userName: string, userMobile: string, deptId: string): Promise<{
        ret: 'ok';
    }>;
    userUpdate(wxId: string, userName: string, deptIdArr: Array<string>): Promise<{
        ret: 'ok';
    }>;
    userDel(userIdArr: Array<string>): Promise<{
        ret: 'ok';
    }>;
    userSimpleList(deptId: string, fetchChild?: 0 | 1): Promise<{
        ret: 'ok';
    }>;
    userList(deptId: string, fetchChild?: 0 | 1): Promise<{
        ret: 'ok';
    }>;
}
