import express from 'express';
import {
  showMe,
  loginUser,
  logoutUser,
  googleRedirect,
} from '../controllers/authControllers.js';
import passport from 'passport';

const authRouter = express.Router();

authRouter.get('/me', showMe);
authRouter.post('/login', passport.authenticate('local'), loginUser);
authRouter.delete('/logout', logoutUser);

authRouter.get('/google', passport.authenticate('google'));
authRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  googleRedirect
);
export default authRouter;
