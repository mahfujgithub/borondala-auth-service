import express from 'express';
const router = express.Router();
import { DalaController } from './dala.controller';
// import { UserValidation } from './user.validation'
import validateRequest from '../../../../middlewares/validateRequest';

router.post('/create-dala', DalaController.createDala);

router.get('/dala', DalaController.getAllDala);

export const DalaRoutes = router;
