import express from 'express';
const router = express.Router();
import { DalaController } from './dala.controller';
// import { UserValidation } from './user.validation'
import validateRequest from '../../../../middlewares/validateRequest';

router.get('/:id', DalaController.getSingleDala);

router.patch('/:id', DalaController.updateDala);

router.delete('/:id', DalaController.deleteDala);

router
  .post('/', DalaController.createDala)
  .get('/', DalaController.getAllDala);

// router.get('/', DalaController.getAllDala);

export const DalaRoutes = router;
