import { Koobot } from './core/koobot'
import { QQ_GROUP_NUMBER, CQ_HTTP_URL } from './utils/envConstant'
import { todayWeather } from './core/schedule'
import { logger } from './utils/winston'

// 创建 koobot 实例
const bot = new Koobot({
  qqGroup: QQ_GROUP_NUMBER,
  qqHttp: CQ_HTTP_URL
})

// 启动服务
bot.start()

// 启动计划任务
todayWeather.start()
logger.info('每日天气预告推送任务已开启')
