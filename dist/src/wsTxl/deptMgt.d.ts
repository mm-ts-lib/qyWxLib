import WxHttp from '../lib/wx.http';
export default class DeptMgt {
    /** ******************************   私有变量    ******************************** * */
    private _wxHttp;
    constructor(wxHttp: WxHttp);
    /** ******************************   公有函数    ******************************** * */
    deptCreate(deptName: string, parentDeptId: string): Promise<{
        ret: 'ok';
    }>;
    deptUpdate(deptId: string, deptName?: string, parentDeptId?: string): Promise<{
        ret: 'ok';
    }>;
    deptDept(deptId: string): Promise<{
        ret: 'ok';
    }>;
}
