import { request } from '../utils/request'
import type { baseEvent, messageD } from '../types/event'

interface wordsParam {
  qq_http: string
  group_id: string
  messageBody: baseEvent<messageD>
}

export const wordsEvent = (param: wordsParam) => {
  request.post(`${param.qq_http}/send_group_msg`, {
    group_id: param.group_id,
    message: `[来自 KooK] ${param.messageBody.d.extra.author.nickname}: ${param.messageBody.d.extra.kmarkdown.raw_content}`
  })
}
