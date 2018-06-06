import WxHttp from '../lib/wx.http';
import { IWX_DEPT_INFO } from './txlDef';
export default class DeptMgt {
    /** ******************************   私有变量    ******************************** * */
    private _wxHttp;
    constructor(wxHttp: WxHttp);
    /** ******************************   公有函数    ******************************** * */
    /**
     * 获取部门列表
     * deptId	否	部门id。获取指定部门及其下的子部门。 如果不填，默认获取全量组织架构
     */
    getDeptArr(deptId?: number): Promise<{
        errcode: 0;
        department: Array<IWX_DEPT_INFO>;
    }>;
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
