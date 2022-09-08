import { request } from '../utils/request'
import { userMap } from '../data/userList'
import type { baseEvent, messageD } from '../types/event'

interface wordsParam {
  qq_http: string
  group_id: string
  messageBody: baseEvent<messageD>
}

export const wordsEvent = (param: wordsParam) => {
  // 检查是否有提到用户
  let mentionArr = param.messageBody.d.extra.mention
  let cq_code = ''
  if (mentionArr.length !== 0) {
    for (let i = 0; i < mentionArr.length; i++) {
      let qqNumber = userMap.get(mentionArr[i])
      if (qqNumber === undefined) {
        continue
      }
      cq_code += ` [CQ:at,qq=${qqNumber}]`
    }
  }

  request.post(`${param.qq_http}/send_group_msg`, {
    group_id: param.group_id,
    message: `[来自 KooK] ${param.messageBody.d.extra.author.nickname}: ${
      param.messageBody.d.extra.kmarkdown.raw_content
    }${mentionArr.length !== 0 ? cq_code : ''}`
  })
}
