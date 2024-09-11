import express from 'express'
const router = express.Router()
import {UserController} from './users.controller'

router.post('/create-user', UserController.createUser)

export const UserRoutes = router;
