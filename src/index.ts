import Koa from 'koa'
import paser from 'koa-bodyparser'

import { logger } from './utils/winston'
import { request } from './utils/request'
import type { baseEvent, messageD } from './types/event'

const app = new Koa()

app.use(paser())

app.use(async (ctx, next) => {
  logger.info(`Process Method ${ctx.request.method} - Url ${ctx.request.url}`)
  logger.info(JSON.stringify(ctx.req.headers))
  logger.info(JSON.stringify(ctx.request.body))
  ctx.response.status = 200

  const body = ctx.request.body
  if (body.d.channel_type === 'WEBHOOK_CHALLENGE') {
    ctx.response.body = { challenge: ctx.request.body.d.challenge }
    await next()
  }

  const messageBody = body as baseEvent<messageD>
  request.post('http://124.223.86.169:5700/send_group_msg', {
    group_id: '685470084',
    message: messageBody.d.extra.last_msg_content
  })

  await next()
})

app.listen(3000, () => {
  logger.info('启动成功')
})
