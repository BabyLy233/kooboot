import { Koobot } from './core/koobot'

// 创建 koobot 实例
const bot = new Koobot({
  qqGroup: '685470084',
  qqHttp: 'http://124.223.86.169:5700'
})

// 启动服务
bot.start()
