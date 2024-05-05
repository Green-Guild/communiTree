import express from 'express';
import {
  listUsers,
  showUser,
  createUser,
  updateUser,
} from '../controllers/userControllers.js';
import checkAuthentication from '../middleware/checkAuthentication.js';

const userRouter = express.Router();

userRouter.post('/', createUser);

// These actions require users to be logged in (authentication)
// Express lets us pass a piece of middleware to run for a specific endpoint
userRouter.get('/', checkAuthentication, listUsers);
userRouter.get('/:id', checkAuthentication, showUser);
userRouter.patch('/:id', checkAuthentication, updateUser);

export default userRouter;
