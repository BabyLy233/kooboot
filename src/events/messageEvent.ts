import { request } from '../utils/request'
import { userMap } from '../data/userList'
import type { baseEvent, messageD, picMsgD } from '../types/event'

interface messageParam<T> {
  qq_http: string
  group_id: string
  messageBody: baseEvent<T>
}

export const wordsEvent = (param: messageParam<messageD>) => {
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

export const pictureEvent = (param: messageParam<picMsgD>) => {
  request.post(`${param.qq_http}/send_group_msg`, {
    group_id: param.group_id,
    message: `[来自 KooK] ${param.messageBody.d.extra.author.nickname}: [CQ:image,file=${param.messageBody.d.extra.attachments.url}]`
  })
}
