import express from 'express';
import { checkSchema } from 'express-validator';
import {
  createUserValidationSchema,
  updatePasswordValidationSchema,
  updateUserValidationSchema,
} from '../utils/validationSchemas/userValidationSchema.js';
import {
  listUsers,
  showUser,
  createUser,
  updateUser,
  updatePassword,
} from '../controllers/userControllers.js';
import checkAuthentication from '../middleware/checkAuthentication.js';

const userRouter = express.Router();

// Create a new user
userRouter.post('/', checkSchema(createUserValidationSchema), createUser);

// These actions require users to be logged in (authentication)
// Express lets us pass a piece of middleware to run for a specific endpoint
userRouter.get('/', checkAuthentication, listUsers);
userRouter.get('/:id', showUser);
userRouter.patch(
  '/:id',
  checkAuthentication,
  checkSchema(updateUserValidationSchema),
  updateUser
);
userRouter.patch(
  '/password/:id',
  checkAuthentication,
  checkSchema(updatePasswordValidationSchema),
  updatePassword
);

export default userRouter;
