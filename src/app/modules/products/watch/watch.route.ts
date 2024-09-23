import express from 'express'
const router = express.Router()
import { WatchController } from './watch.controller'
// import { UserValidation } from './user.validation'
import validateRequest from '../../../middlewares/validateRequest'

router.post('/create-watch', WatchController.createWatch)

export const WatchRoutes = router
