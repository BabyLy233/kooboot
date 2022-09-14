import { request } from '../utils/request'

interface channelMessageParam {
  type?: 1 | 9 | 10
  target_id: string
  content: string
  quote?: string
  nonce?: string
  temp_target_id?: string
}

export function sendChannelMessage(param: channelMessageParam) {
  return request.post('/api/v3/message/create', param)
}
