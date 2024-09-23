import express, { Application, NextFunction, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import { UserRoutes } from './app/modules/users/common/user.route'
import { CustomerRoutes } from './app/modules/users/customer/customer.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import ApiError from './errors/ApiError'

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Routes
app.use('/api/v1/users/', UserRoutes)
app.use('/api/v1/customers', CustomerRoutes)

// testing
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  // console.log(x)
})

// global error handler
app.use(globalErrorHandler)

// app.get('/', async (req: Request, res: Response) => {
//   await usersService.createUser({
//     id: '999',
//     password: '1234',
//     role: 'customer',
//   })
//   res.send('Hello World!')
// })

export default app
