"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by mq on 18-05-30.
 * 发送wx应用消息
 */
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const _d = debug_1.default('@tslib/qyWxLib:' + path_1.default.basename(__filename));
const lodash_1 = __importDefault(require("lodash"));
const txlDef_1 = require("./txlDef");
class DeptMgt {
    constructor(wxHttp) {
        this._wxHttp = wxHttp;
    }
    /** ******************************   公有函数    ******************************** * */
    /**
     * 获取部门列表
     * deptId	否	部门id。获取指定部门及其下的子部门。 如果不填，默认获取全量组织架构
     */
    async getDeptArr(deptId) {
        let _paramData = { access_token: this._wxHttp.getLocalToken(txlDef_1.TXL_AGENT_ID) };
        if (deptId) {
            _paramData = Object.assign(_paramData, {
                id: deptId
            });
        }
        return this._wxHttp.wxApiGet('department/list', _paramData, txlDef_1.TXL_AGENT_ID);
    }
    /*
    * 创建部门
    * name	是	部门名称。长度限制为1~64个字节，字符不能包括\:?”<>｜
    * parentId	是	父部门id
    * order	否	在父部门中的次序值。order值大的排序靠前。有效的值范围是[0, 2^32)
    * id	否	部门id，整型。指定时必须大于1，否则自动生成
    * */
    async deptCreate(deptName, parentDeptId) {
        return this._wxHttp.wxApiPost('department/create', { access_token: this._wxHttp.getLocalToken(txlDef_1.TXL_AGENT_ID) }, { name: deptName, parentid: parentDeptId }, txlDef_1.TXL_AGENT_ID);
    }
    /*
    * 更新部门
    * access_token	是	调用接口凭证
    * id	是	部门id
    * name	否	部门名称。长度限制为1~64个字节，字符不能包括\:?”<>｜
    * parentid	否	父部门id
    * order	否	在父部门中的次序值。order值大的排序靠前。有效的值范围是[0, 2^32)
    * */
    async deptUpdate(deptId, deptName, parentDeptId) {
        const postData = {
            id: deptId // 需要修改的部门Id
        };
        if (deptName) {
            // 否 部门名称。长度限制为1~64个字节，字符不能包括\:?”<>｜
            lodash_1.default.set(postData, 'name', deptName);
        }
        if (parentDeptId) {
            // 否	父部门id
            lodash_1.default.set(postData, 'parentid', parentDeptId);
        }
        return this._wxHttp.wxApiPost('department/update', { access_token: this._wxHttp.getLocalToken(txlDef_1.TXL_AGENT_ID) }, postData, txlDef_1.TXL_AGENT_ID);
    }
    /*
    * 删除部门
    * id	否	部门id。（注：不能删除根部门；不能删除含有子部门、成员的部门）
    * */
    async deptDept(deptId) {
        const postData = {
            id: deptId
        };
        // if (deptId) {  // 否	部门id。（注：不能删除根部门；不能删除含有子部门、成员的部门）
        //   _.set(postData, 'id', deptId);
        // }
        return this._wxHttp.wxApiPost('department/delete', { access_token: this._wxHttp.getLocalToken(txlDef_1.TXL_AGENT_ID) }, postData, txlDef_1.TXL_AGENT_ID);
    }
}
exports.default = DeptMgt;
//# sourceMappingURL=DeptMgt.js.map