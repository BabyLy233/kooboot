import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.kookapp.cn/api',
  timeout: 5000,
  headers: {
    Authorization: 'BOT 1/MTE0NjE=/0h07wfPV4K7SppQjCpVAIQ=='
  }
})

export { instance as request }
