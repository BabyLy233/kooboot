import cron from 'cron'

import { request } from '../utils/request'
import { sendChannelMessage } from '../api/messageApi'
import { logger } from '../utils/winston'
import { WEATHER_KEY } from '../utils/envConstant'

import type { weather } from '../types/weather'

/**
 * 创建 定时任务 每天晚上 9点 发布次日天气
 */
const CronJob = cron.CronJob
const getTomorrowWeather = new CronJob(
  '0 0 21 * * *',
  () => {
    request
      .get(`https://devapi.qweather.com/v7/weather/3d?key=${WEATHER_KEY}`)
      .then((res) => {
        const tomorrow: weather = res.data.daily[1]
        logger.info('获取到天气数据，准备推送')
        sendChannelMessage({
          type: 10,
          target_id: '2378440983924611',
          content: JSON.stringify([
            {
              type: 'card',
              theme: 'secondary',
              size: 'lg',
              modules: [
                {
                  type: 'header',
                  text: {
                    type: 'plain-text',
                    content: `常州市 ${tomorrow.fxDate} 天气预报`
                  }
                },
                {
                  type: 'section',
                  text: {
                    type: 'paragraph',
                    cols: 3,
                    fields: [
                      {
                        type: 'kmarkdown',
                        content: `**最高气温**\n${tomorrow.tempMax} °C`
                      },
                      {
                        type: 'kmarkdown',
                        content: `**最低气温**\n${tomorrow.tempMin} °C`
                      }
                    ]
                  }
                },
                {
                  type: 'section',
                  text: {
                    type: 'paragraph',
                    cols: 3,
                    fields: [
                      {
                        type: 'kmarkdown',
                        content: `**白天天气状况**\n${tomorrow.textDay}`
                      },
                      {
                        type: 'kmarkdown',
                        content: `**夜间天气状况**\n${tomorrow.textNight}`
                      }
                    ]
                  }
                },
                {
                  type: 'section',
                  text: {
                    type: 'plain-text',
                    content: '去 /和风天气/ 查看今日详细天气报告'
                  },
                  mode: 'right',
                  accessory: {
                    type: 'button',
                    theme: 'primary',
                    value: `${res.data.fxLink}`,
                    click: 'link',
                    text: {
                      type: 'plain-text',
                      content: '立即前往'
                    }
                  }
                }
              ]
            }
          ])
        })
      })
      .catch((e) => {
        logger.error(e)
      })
  },
  null,
  false,
  'utc+8'
)

export { getTomorrowWeather }
