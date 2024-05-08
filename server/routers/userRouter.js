import express from 'express';
import { checkSchema } from 'express-validator';
import { createUserValidationSchema } from '../utils/validationSchema.js';
import {
  listUsers,
  showUser,
  createUser,
  updateUser,
} from '../controllers/userControllers.js';
import checkAuthentication from '../middleware/checkAuthentication.js';

const userRouter = express.Router();

// Create a new user
userRouter.post('/', checkSchema(createUserValidationSchema), createUser);

// These actions require users to be logged in (authentication)
// Express lets us pass a piece of middleware to run for a specific endpoint
userRouter.get('/', checkAuthentication, listUsers);
userRouter.get('/:id', checkAuthentication, showUser);
userRouter.patch(
  '/:id',
  checkAuthentication,
  checkSchema(createUserValidationSchema),
  updateUser
);

export default userRouter;
