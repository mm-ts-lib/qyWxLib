import WxHttp from '../lib/wx.http';
export default class DeptMgt {
    /** ******************************   私有变量    ******************************** * */
    private _wxHttp;
    constructor(wxHttp: WxHttp);
    /** ******************************   公有函数    ******************************** * */
    deptCreate(deptName: string, parentDeptId: number): Promise<{
        errcode: number;
    }>;
    deptUpdate(deptId: number, deptName?: string, parentDeptId?: number): Promise<{
        errcode: number;
    }>;
    deptDept(deptId: number): Promise<{
        errcode: number;
    }>;
}
