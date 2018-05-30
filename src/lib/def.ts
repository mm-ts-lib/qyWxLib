/**
 * Created by mq on 18-05-30.
 * 公共类型定义
 */
// wxCfg文件格式
export interface IWX_CFG {
  corpId: string;
  // 应用列表
  agents: Array<{
    agentId: string;
    secret: string;
  }>;
  // 消息型应用
  apps: {
    [Name: string]: {
      agentId: string;
      entToken: string;
      encodingAESKey: string;
    };
  };
}
// 本地保存token
export interface ILOCAL_TOKENS {
  [Name: string]: string;
}
