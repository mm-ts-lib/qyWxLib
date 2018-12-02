/**
 * Created by mq on 18-05-30.
 * 发送wx应用消息
 */

import path from 'path';
import debug from 'debug';
const _d = debug('@tslib/qyWxLib:' + path.basename(__filename));

import _ from 'lodash';
import WxHttp from '../lib/wx.http';
import { TXL_AGENT_ID, IWX_USER_INFO } from './txlDef';

export default class UserMgt {
  /** ******************************   私有变量    ******************************** * */
  private _wxHttp: WxHttp;

  constructor(wxHttp: WxHttp) {
    this._wxHttp = wxHttp;
  }
  /** ******************************   公有函数    ******************************** * */
  /**
   * 通过id获取用户信息
   * @param userid
   * @param agentid
   */
  public async getUserInfoById(userid: string): Promise<IWX_USER_INFO> {
    return this._wxHttp.wxApiGet(
      'user/get',
      { access_token: this._wxHttp.getLocalToken(TXL_AGENT_ID), userid },
      TXL_AGENT_ID,
    );
  }
  /**
   * 通过id获取用户信息
   * @param userid
   * @param agentid
   */
  public async getOpenIdByUserId(userid: string): Promise<IWX_USER_INFO> {
    return this._wxHttp.wxApiPost(
      'user/convert_to_openid',
      { access_token: this._wxHttp.getLocalToken(TXL_AGENT_ID) },
      { userid },
      TXL_AGENT_ID,
    );
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
  public async userCreate(
    wxId: string,
    userName: string,
    userMobile: string | null,
    userEmail: string | null,
    deptIdArr: Array<number>,
  ): Promise<{ errcode: number }> {
    let postData = {
      userid: wxId,
      name: userName,
      department: deptIdArr,
    };
    if (userMobile) {
      postData = _.assign(postData, { mobile: userMobile });
    }
    if (userEmail) {
      // 增加email、deptIdArr创建用户，changed By MQ 20181202
      postData = _.assign(postData, { email: userEmail });
    }

    return this._wxHttp.wxApiPost(
      'user/create',
      { access_token: this._wxHttp.getLocalToken(TXL_AGENT_ID) },
      postData,
      TXL_AGENT_ID,
    );
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
  public async userUpdate(
    wxId: string,
    userName: string,
    deptIdArr: Array<number>,
  ): Promise<{ errcode: number }> {
    // 修改的内容
    const postData = {
      userid: wxId,
    };
    if (userName) {
      // 否	成员名称。长度为1~64个字节
      _.set(postData, 'name', userName);
    }
    if (_.isArray(deptIdArr)) {
      // 否	成员所属部门id列表,不超过20个
      if (deptIdArr.length > 20) {
        throw new Error('成员所属部门不超过20个');
      }
      _.set(postData, 'department', deptIdArr);
    }

    return this._wxHttp.wxApiPost(
      'user/update',
      { access_token: this._wxHttp.getLocalToken(TXL_AGENT_ID) },
      postData,
      TXL_AGENT_ID,
    );
  }
  /*
  * 批量删除成员
  * userIdArr: 是	成员UserID列表。对应管理端的帐号。（最多支持200个）
  * */
  public async userDel(userIdArr: Array<string>): Promise<{ errcode: number }> {
    const postData = {
      useridlist: userIdArr,
    };

    return this._wxHttp.wxApiPost(
      'user/batchdelete',
      { access_token: this._wxHttp.getLocalToken(TXL_AGENT_ID) },
      postData,
      TXL_AGENT_ID,
    );
  }
  /*
  * 获取部门成员列表(简单信息)
  * deptId: 部门Id
  * */
  public async userSimpleList(
    deptId: number,
    fetchChild?: 0 | 1,
  ): Promise<{
    userlist: Array<{
      userid: string;
      name: string;
      department: Array<number>;
    }>;
  }> {
    let _fetchChild = 0;
    if (fetchChild) {
      _fetchChild = 1;
    }
    return this._wxHttp.wxApiGet(
      'user/simplelist',
      {
        access_token: this._wxHttp.getLocalToken(TXL_AGENT_ID),
        department_id: deptId,
        fetch_child: _fetchChild, // 0,不取子部门
      },
      TXL_AGENT_ID,
    );
  }
  /*
  * 获取部门成员列表(详情)
  * deptId: 部门Id
  * */
  public async userList(
    deptId: number,
    fetchChild?: 0 | 1,
  ): Promise<{ userlist: Array<IWX_USER_INFO> }> {
    let _fetchChild = 0;
    if (fetchChild) {
      _fetchChild = 1;
    }

    return this._wxHttp.wxApiGet(
      'user/list',
      {
        access_token: this._wxHttp.getLocalToken(TXL_AGENT_ID),
        department_id: deptId,
        fetch_child: _fetchChild, // 0,不取子部门
      },
      TXL_AGENT_ID,
    );
  }
  /** ******************************   获取部门成员    ******************************** * */
}
