import express from 'express'
const router = express.Router()
import { WatchController } from './watch.controller'
// import { UserValidation } from './user.validation'
import validateRequest from '../../../../middlewares/validateRequest';

router.post('/create', WatchController.createWatch)

router.get('/', WatchController.getAllWatches)

export const WatchRoutes = router
