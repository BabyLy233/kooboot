import { request } from '../utils/request'

export function getChannelInfo(targetId: string) {
  return request.get(`/api/v3/channel/view?target_id=${targetId}`)
}
