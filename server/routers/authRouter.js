import express from 'express';
import {
  showMe,
  loginUser,
  logoutUser,
} from '../controllers/authControllers.js';
import passport from 'passport';

const authRouter = express.Router();

authRouter.get('/me', showMe);
authRouter.post('/login', passport.authenticate('local'), loginUser);
authRouter.delete('/logout', logoutUser);

export default authRouter;
