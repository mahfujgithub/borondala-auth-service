import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorLogger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', err => {
  errorLogger.error(err)
  process.exit(1)
})

let server: Server

async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string)

    logger.info(`Database is connected successfully!`)

    server = app.listen(config.port, () => {
      logger.info(`App listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error(`failed to connect database, ${err}`)
  }

  process.on('unhandledRejection', err => {
    if(server) {
      server.close(() => {
        errorLogger.error(err)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }  
  })
}

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received!')
  if(server) {
    server.close()
  }
})

boostrap()
