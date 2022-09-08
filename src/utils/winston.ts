import { createLogger, format, transports } from 'winston'

const customFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.colorize(),
  format.printf((i) => `>${i.level}: ${[i.timestamp]}: ${i.message}\n`)
)

const logger = createLogger({
  format: customFormat,
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'logs/koobot.log'
    })
  ]
})

export { logger }
