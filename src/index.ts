import { Koobot } from './core/koobot'
import { QQ_GROUP_NUMBER, CQ_HTTP_URL } from './utils/envConstant'

// 创建 koobot 实例
const bot = new Koobot({
  qqGroup: QQ_GROUP_NUMBER,
  qqHttp: CQ_HTTP_URL
})

// 启动服务
bot.start()
