import Koa from 'koa'
import paser from 'koa-bodyparser'

import { logger } from '../utils/winston'
import { SERVER_PORT } from '../utils/envConstant'
import { wordsEvent, pictureEvent } from '../events/messageEvent'
import { joinChannelEvent, exitChannelEvent } from '../events/userEvent'

import type { botConfig } from '../types/botConfig'
import type {
  baseEvent,
  challengeD,
  messageD,
  exitChannelD,
  joinChannelD,
  picMsgD
} from '../types/event'

class Koobot {
  private qq_group: string
  private qq_http: string

  constructor(config: botConfig) {
    this.qq_group = config.qqGroup
    this.qq_http = config.qqHttp
  }

  // 启动机器人
  start = () => {
    const app = new Koa()

    app.use(paser())

    // 打印基础日志
    app.use(async (ctx, next) => {
      logger.info(
        `Process Method ${ctx.request.method} - Url ${ctx.request.url}`
      )
      logger.info(JSON.stringify(ctx.req.headers))
      logger.info(JSON.stringify(ctx.request.body))
      await next()
    })

    // 处理请求
    app.use(async (ctx, next) => {
      ctx.response.status = 200
      const commonBody = ctx.request.body

      // 处理 challenge 请求
      if (commonBody.d.channel_type === 'WEBHOOK_CHALLENGE') {
        const body = commonBody as baseEvent<challengeD>
        ctx.response.body = {
          challenge: body.d.challenge
        }
        return
      }

      // 文字消息
      if (commonBody.d.extra.type === 9) {
        const body = commonBody as baseEvent<messageD>
        wordsEvent({
          qq_http: this.qq_http,
          group_id: this.qq_group,
          messageBody: body
        })
        return
      }

      // 图片消息
      if (commonBody.d.extra.type === 2) {
        const body = commonBody as baseEvent<picMsgD>
        pictureEvent({
          qq_http: this.qq_http,
          group_id: this.qq_group,
          messageBody: body
        })
        return
      }

      // 退出频道
      if (commonBody.d.extra.type === 'exited_channel') {
        // const body = commonBody as baseEvent<exitChannelD>
        // exitChannelEvent({
        //   qq_http: this.qq_http,
        //   group_id: this.qq_group,
        //   messageBody: body
        // })
        return
      }

      // 进入频道
      if (commonBody.d.extra.type === 'joined_channel') {
        const body = commonBody as baseEvent<joinChannelD>
        joinChannelEvent({
          qq_http: this.qq_http,
          group_id: this.qq_group,
          messageBody: body
        })
        return
      }

      await next()
    })

    app.listen(SERVER_PORT, () => {
      logger.info(`koobot机器人实例创建成功 - 端口 : ${SERVER_PORT}`)
    })
  }
}

export { Koobot }
