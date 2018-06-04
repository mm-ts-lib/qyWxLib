// 统一通讯录应用的agentid
export const TXL_AGENT_ID = 'txl';

// wx用户信息
export interface IWX_USER_INFO {
  errcode: number; // 0
  errmsg: string; //'ok',
  userid: string; //'mengqi',
  name: string; //'孟褀',
  department: Array<number>; //[ 15 ],
  // position: string; //'',职位信息；第三方仅通讯录应用可获取
  mobile: string; //'15801557257',
  // gender: string; //'1',
  // email: string; //'mengqi@magicmind.cn',
  // avatar: string; //'http://shp.qpic.cn/bizmp/mibeLaAzIYYCr8hoKRn1vmK7q0mPCNeqaX8m8wAiazicDtPibtGlTHia6bw/',
  // status: number; //1,
  // isleader: number; //0,
  // extattr: { attrs: Array<Object> }; // { attrs: [ [Object] ] },
  // english_name: string; //'',
  // telephone: string; //'',
  enable: number; //1,激活状态: 1=已激活，2=已禁用，4=未激活。
  // 已激活代表已激活企业微信或已关注微工作台（原企业号）。未激活代表既未激活企业微信又未关注微工作台（原企业号）。
  // hide_mobile: number; //0,
  // order: Array<number>; //[ 0 ],
  // qr_code: string; //'http://open.work.weixin.qq.com/wwopen/userQRCode?vcode=vc2a0e5f4373adf93e'
}