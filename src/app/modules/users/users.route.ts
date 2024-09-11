import express from 'express';
const router = express.Router();
import usersController from './users.controller';

router.post('/create-user', usersController.createUser);

export default router;