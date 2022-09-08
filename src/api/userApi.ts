import { request } from '../utils/request'

export function getUserInfo(userId: string) {
  return request.get(`/api/v3/user/view?user_id=${userId}`)
}
