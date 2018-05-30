/**
 * Created by mq on 18/05/28.
 * school 微信服务配置文件
 */
export default {
  corpId: 'wx8e8e7f2fc400e61f',
  // 应用列表
  agents: [
    {
      // 默认配置
      agentid: '000000',
      secret: 'a8BlSXiCZumPnZlAxXaPeqr1llmIH-WI8ZbATFL3aKx6Efd_pp-dXhuirYMko9lz'
    },
    {
      // 通讯录(同步助手)应用
      agentid: '1000006',
      secret: '69fHMqwEiq1oSRr3BYy0Cp-gkUmWyAGlP7OuTIKojkM'
    }
  ],
  // 消息型应用
  apps: {
    // homeschool: { // 家校通
    //   agentid: 26,
    //   entToken: "kL8qG6EeHzb76pMhQUn",
    //   encodingAESKey: 'mCtpeoco6TNjFSPtUVA9a2TMTcLL74nY7K4djtziXcR',
    // },
    // myclass: { // 我的班级
    //   agentid: 27,
    //   entToken: "xaU5ZeaK0EcUdGJE248kx5Vho",
    //   encodingAESKey: 'fj5cpUz3VjzKJA4SfQ8zxxZVcVLhUPMyxqhHtTKLhYn',
    // },
  }
};
