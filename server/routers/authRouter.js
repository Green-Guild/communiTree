import express from 'express';
import {
  showMe,
  loginUser,
  logoutUser,
  googleRedirect,
} from '../controllers/authControllers.js';
import passport from 'passport';
import checkAuthentication from '../middleware/checkAuthentication.js';

const authRouter = express.Router();

authRouter.get('/me', checkAuthentication, showMe);
authRouter.post('/login', passport.authenticate('local'), loginUser);
authRouter.delete('/logout', checkAuthentication, logoutUser);

authRouter.get('/google', passport.authenticate('google'));
authRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  googleRedirect
);
export default authRouter;
