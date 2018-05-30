/**
 * Created by mq on 18-05-30.
 * 公共类型定义
 */
// wxCfg文件格式
export interface IWX_CFG {
  corpId: string;
  // 应用列表
  agents: Array<{
    agentid: string;
    secret: string;
  }>;
  // 消息型应用
  apps: {
    [Name: string]: {
      agentid: string;
      entToken: string;
      encodingAESKey: string;
    };
  };
}
// 本地保存token
export interface ILOCAL_TOKENS {
  [Name: string]: string;
}
// wxUserMsg
// export interface IWX_USER_MSG {
//   touser: string; // _userIdStr,
//   msgtype: string; // 'text' | 'image';
//   agentid: string;
//   text?: {
//     content: string;
//   };
//   safe: number; // 0
// }

// wx用户信息
export interface IWX_USER_INFO {
  errcode: number; // 0
  errmsg: string; //'ok',
  userid: string; //'mengqi',
  name: string; //'孟褀',
  department: Array<number>; //[ 15 ],
  position: string; //'',
  mobile: string; //'15801557257',
  gender: string; //'1',
  email: string; //'mengqi@magicmind.cn',
  avatar: string; //'http://shp.qpic.cn/bizmp/mibeLaAzIYYCr8hoKRn1vmK7q0mPCNeqaX8m8wAiazicDtPibtGlTHia6bw/',
  status: number; //1,
  isleader: number; //0,
  extattr: { attrs: Array<Object> }; // { attrs: [ [Object] ] },
  english_name: string; //'',
  telephone: string; //'',
  enable: number; //1,
  hide_mobile: number; //0,
  order: Array<number>; //[ 0 ],
  qr_code: string; //'http://open.work.weixin.qq.com/wwopen/userQRCode?vcode=vc2a0e5f4373adf93e'
}
// wx用户信息
export interface IWX_MSG_RES {
  errcode: number; //0,
  errmsg: string; //'ok';
  invaliduser?: string; //'userid1|userid2'; // 不区分大小写，返回的列表都统一转为小写
  invalidparty?: string; //'partyid1|partyid2';
  invalidtag?: string; //'tagid1|tagid2';
}
