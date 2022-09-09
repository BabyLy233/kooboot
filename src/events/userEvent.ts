import { logger } from '../utils/winston'
import { request } from '../utils/request'
import { getUserInfo } from '../api/userApi'
import { getChannelInfo } from '../api/channelApi'

import type { baseEvent, exitChannelD, joinChannelD } from '../types/event'

interface exitParam {
  qq_http: string
  group_id: string
  messageBody: baseEvent<exitChannelD>
}

interface joinParam {
  qq_http: string
  group_id: string
  messageBody: baseEvent<joinChannelD>
}

/**
 * 用户退出频道事件
 *
 * @param param 退出频道消息体参数
 */
export const exitChannelEvent = (param: exitParam) => {
  getUserInfo(param.messageBody.d.extra.body.user_id)
    .then((res) => {
      const nickname = res.data.data.nickname
      getChannelInfo(param.messageBody.d.extra.body.channel_id).then((res) => {
        const channelName = res.data.data.name
        request.post(`${param.qq_http}/send_group_msg`, {
          group_id: param.group_id,
          message: `[来自 KooK] ${nickname} 离开了 ${channelName} 频道`
        })
      })
    })
    .catch((err) => {
      logger.error(err)
    })
}

/**
 * 用户加入频道事件
 *
 * @param param 加入频道消息体参数
 */
export const joinChannelEvent = (param: joinParam) => {
  getUserInfo(param.messageBody.d.extra.body.user_id)
    .then((res) => {
      const nickname = res.data.data.nickname
      getChannelInfo(param.messageBody.d.extra.body.channel_id).then((res) => {
        const channelName = res.data.data.name
        request.post(`${param.qq_http}/send_group_msg`, {
          group_id: param.group_id,
          message: `[来自 KooK] ${nickname} 进入了 ${channelName} 频道`
        })
      })
    })
    .catch((err) => {
      logger.error(err)
    })
}
