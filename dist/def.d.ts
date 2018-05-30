/**
 * Created by mq on 18-05-30.
 * 公共类型定义
 */
export interface IWX_CFG {
    corpId: string;
    agents: Array<{
        agentId: string;
        secret: string;
    }>;
    apps: {
        [Name: string]: {
            agentId: string;
            entToken: string;
            encodingAESKey: string;
        };
    };
}
