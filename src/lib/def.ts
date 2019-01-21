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

// 图文消息
export interface IWX_ARTICLE {
  title: string;
  description: string;
  url: string;
  picurl: string;
}
// wx
export interface IWX_MSG_RES {
  errcode: number; //0,
  errmsg: string; //'ok';
  invaliduser?: string; //'userid1|userid2'; // 不区分大小写，返回的列表都统一转为小写
  invalidparty?: string; //'partyid1|partyid2';
  invalidtag?: string; //'tagid1|tagid2';
}
