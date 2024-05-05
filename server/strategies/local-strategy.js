import passport from 'passport';
import { Strategy } from 'passport-local';
import User from '../db/models/User.js';
import { isValidPassword } from '../utils/auth-utils.js';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await User.find(id);
    if (!findUser) throw new Error('User Not Found');
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await User.findByUsername(username);
      if (!findUser) throw new Error('User not found');
      if (!isValidPassword(password, findUser.password)) {
        throw new Error('Bad Credentials');
      }
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);
