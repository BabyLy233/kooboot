import * as dotenv from 'dotenv'

dotenv.config()

const SERVER_PORT = process.env.SERVER_PORT as string
const QQ_GROUP_NUMBER = process.env.QQ_GROUP_NUMBER as string
const CQ_HTTP_URL = process.env.CQ_HTTP_URL as string
const KOOK_TOKEN = process.env.KOOK_TOKEN as string

export { SERVER_PORT, QQ_GROUP_NUMBER, CQ_HTTP_URL, KOOK_TOKEN }
