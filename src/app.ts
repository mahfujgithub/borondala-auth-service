import express, { Application, NextFunction, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routes from './app/routes'

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Routes
app.use('/api/v1', routes)

// global error handler
app.use(globalErrorHandler)


// testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   console.log(x)
// })


export default app
