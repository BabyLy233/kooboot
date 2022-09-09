import axios from 'axios'

import { KOOK_TOKEN } from '../utils/envConstant'

const instance = axios.create({
  baseURL: 'https://www.kookapp.cn',
  timeout: 5000,
  headers: {
    Authorization: `Bot ${KOOK_TOKEN}`
  }
})

export { instance as request }
