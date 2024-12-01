import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { Server } from 'http'

process.on('uncaughtException', err => {
  console.log(err)
  process.exit(1)
})

let server: Server

async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string)

    console.log(`Database is connected successfully!`);

    server = app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    })
  } catch (err) {
    console.log(`failed to connect database, ${err}`);
  }

  process.on('unhandledRejection', err => {
    if(server) {
      server.close(() => {
        console.log(err);
        process.exit(1)
      })
    } else {
      process.exit(1)
    }  
  })
}

process.on('SIGTERM', () => {
  console.log('SIGTERM is received!');
  if(server) {
    server.close()
  }
})

boostrap()
