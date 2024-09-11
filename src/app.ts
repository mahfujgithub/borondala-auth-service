import express, { Application, Request, Response } from 'express'
const app: Application = express();
import usersService from './app/modules/users/users.service';
import cors from 'cors';
import usersRouters from './app/modules/users/users.route'

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Application Routes
app.use('/api/v1/users/', usersRouters)

app.get('/', async (req: Request, res: Response) => {
  await usersService.createUser({
    id: '999',
    password: '1234',
    role: 'customer'
  })
  res.send('Hello World!')
})

export default app
