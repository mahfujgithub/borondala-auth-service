import express from 'express';
const router = express.Router();
import { DalaController } from './dala.controller';
// import { UserValidation } from './user.validation'
import validateRequest from '../../../../middlewares/validateRequest';

router.post('/create', DalaController.createDala);

router.get('/', DalaController.getAllDala);

export const DalaRoutes = router;
