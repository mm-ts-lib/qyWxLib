"use strict";
/**
 * Created by mq on 18-05-30.
 * 发送wx应用消息
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const _d = debug_1.default('@tslib/qyWxLib:' + path_1.default.basename(__filename));
const lodash_1 = __importDefault(require("lodash"));
const txlDef_1 = require("./txlDef");
class UserMgt {
    constructor(wxHttp) {
        this._wxHttp = wxHttp;
    }
    /** ******************************   公有函数    ******************************** * */
    /**
     * 通过id获取用户信息
     * @param userid
     * @param agentid
     */
    async getUserInfoById(userid) {
        return this._wxHttp.wxApiGet('user/get', { access_token: this._wxHttp.getLocalToken(txlDef_1.TXL_AGENT_ID), userid }, txlDef_1.TXL_AGENT_ID);
    }
    /**
     * 通过id获取用户信息
     * @param userid
     * @param agentid
     */
    async getOpenIdByUserId(userid) {
        return this._wxHttp.wxApiPost('user/convert_to_openid', { access_token: this._wxHttp.getLocalToken(txlDef_1.TXL_AGENT_ID) }, { userid }, txlDef_1.TXL_AGENT_ID);
    }
    /*
    * 创建成员
    * name	是	成员名称。长度为1~64个字节
    * english_name	否	英文名。长度为1-64个字节。
    * mobile	否	手机号码。企业内必须唯一，mobile/email二者不能同时为空
    * department	是	成员所属部门id列表,不超过20个
    * order	否	部门内的排序值，默认为0。数量必须和department一致，数值越大排序越前面。有效的值范围是[0, 2^32)
    * position	否	职位信息。长度为0~64个字节
    * gender	否	性别。1表示男性，2表示女性
    * email	否	邮箱。长度为0~64个字节。企业内必须唯一，mobile/email二者不能同时为空
    * telephone	否	座机。长度0-64个字节。
    * isleader	否	上级字段，标识是否为上级。
    * avatar_mediaid	否	成员头像的mediaid，通过多媒体接口上传图片获得的mediaid
    * enable	否	启用/禁用成员。1表示启用成员，0表示禁用成员
    * extattr	否	自定义字段。自定义字段需要先在WEB管理端“我的企业” — “通讯录管理”添加，否则忽略未知属性的赋值
    * */
    async userCreate(wxId, userName, userMobile, userEmail, deptIdArr) {
        let postData = {
            userid: wxId,
            name: userName,
            department: deptIdArr,
        };
        if (userMobile) {
            postData = lodash_1.default.assign(postData, { mobile: userMobile });
        }
        if (userEmail) {
            // 增加email、deptIdArr创建用户，changed By MQ 20181202
            postData = lodash_1.default.assign(postData, { email: userEmail });
        }
        return this._wxHttp.wxApiPost('user/create', { access_token: this._wxHttp.getLocalToken(txlDef_1.TXL_AGENT_ID) }, postData, txlDef_1.TXL_AGENT_ID);
    }
    /*
    * 更新成员
    * name	否	成员名称。长度为1~64个字节
    * english_name	否	英文名。长度为1-64个字节。
    * mobile	否	手机号码。企业内必须唯一。若成员已激活企业微信，则需成员自行修改
    * department	否	成员所属部门id列表,不超过20个
    * order	否	部门内的排序值，默认为0。数量必须和department一致，数值越大排序越前面。有效的值范围是[0, 2^32)
    * position	否	职位信息。长度为0~64个字节
    * gender	否	性别。1表示男性，2表示女性
    * email	否	邮箱。长度为0~64个字节。企业内必须唯一
    * telephone	否	座机。长度0-64个字节。
    * isleader	否	上级字段，标识是否为上级。
    * avatar_mediaid	否	成员头像的mediaid，通过多媒体接口上传图片获得的mediaid
    * enable	否	启用/禁用成员。1表示启用成员，0表示禁用成员
    * extattr	否	扩展属性。扩展属性需要在WEB管理端创建后才生效，否则忽略未知属性的赋值
    * */
    async userUpdate(wxId, userName, deptIdArr) {
        // 修改的内容
        const postData = {
            userid: wxId,
        };
        if (userName) {
            // 否	成员名称。长度为1~64个字节
            lodash_1.default.set(postData, 'name', userName);
        }
        if (lodash_1.default.isArray(deptIdArr)) {
            // 否	成员所属部门id列表,不超过20个
            if (deptIdArr.length > 20) {
                throw new Error('成员所属部门不超过20个');
            }
            lodash_1.default.set(postData, 'department', deptIdArr);
        }
        return this._wxHttp.wxApiPost('user/update', { access_token: this._wxHttp.getLocalToken(txlDef_1.TXL_AGENT_ID) }, postData, txlDef_1.TXL_AGENT_ID);
    }
    /*
    * 批量删除成员
    * userIdArr: 是	成员UserID列表。对应管理端的帐号。（最多支持200个）
    * */
    async userDel(userIdArr) {
        const postData = {
            useridlist: userIdArr,
        };
        return this._wxHttp.wxApiPost('user/batchdelete', { access_token: this._wxHttp.getLocalToken(txlDef_1.TXL_AGENT_ID) }, postData, txlDef_1.TXL_AGENT_ID);
    }
    /*
    * 获取部门成员列表(简单信息)
    * deptId: 部门Id
    * */
    async userSimpleList(deptId, fetchChild) {
        let _fetchChild = 0;
        if (fetchChild) {
            _fetchChild = 1;
        }
        return this._wxHttp.wxApiGet('user/simplelist', {
            access_token: this._wxHttp.getLocalToken(txlDef_1.TXL_AGENT_ID),
            department_id: deptId,
            fetch_child: _fetchChild,
        }, txlDef_1.TXL_AGENT_ID);
    }
    /*
    * 获取部门成员列表(详情)
    * deptId: 部门Id
    * */
    async userList(deptId, fetchChild) {
        let _fetchChild = 0;
        if (fetchChild) {
            _fetchChild = 1;
        }
        return this._wxHttp.wxApiGet('user/list', {
            access_token: this._wxHttp.getLocalToken(txlDef_1.TXL_AGENT_ID),
            department_id: deptId,
            fetch_child: _fetchChild,
        }, txlDef_1.TXL_AGENT_ID);
    }
}
exports.default = UserMgt;
//# sourceMappingURL=userMgt.js.map