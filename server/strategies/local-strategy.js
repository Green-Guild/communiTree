import passport from 'passport';
import { Strategy } from 'passport-local';
import User from '../db/models/User.js';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const existingUser = await User.find(id);
    if (!existingUser) throw new Error('User Not Found');
    done(null, existingUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const existingUser = await User.findByUsername(username);
      if (!existingUser) throw new Error('User not found');
      if (!(await existingUser.isValidPassword(password))) {
        throw new Error('Bad Credentials');
      }
      done(null, existingUser);
    } catch (err) {
      done(err, null);
    }
  })
);
