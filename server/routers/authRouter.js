import express from 'express';
import {
  showMe,
  loginUser,
  logoutUser,
} from '../controllers/authControllers.js';

const authRouter = express.Router();

authRouter.get('/me', showMe);
authRouter.post('/login', loginUser);
authRouter.delete('/logout', logoutUser);

export default authRouter;
