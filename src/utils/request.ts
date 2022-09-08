import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.kookapp.cn',
  timeout: 5000,
  headers: {
    Authorization: 'Bot 1/MTE0NjE=/0h07wfPV4K7SppQjCpVAIQ=='
  }
})

export { instance as request }
