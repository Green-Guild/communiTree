import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import GoogleUser from '../db/models/GoogleUser.js';

// passport.serializeUser((googleUser, done) => {
//   console.log(googleUser);
//   done(null, googleUser);
// });

// passport.deserializeUser(async (user, done) => {
//   try {
//     const findUser = await GoogleUser.findByGoogleId(user.googleId);
//     return findUser ? done(null, findUser) : done(null, null);
//   } catch (err) {
//     done(err, null);
//   }
// });

export default passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_ClIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/google/callback',
      scope: ['profile'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await GoogleUser.findByGoogleId(profile.id);

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await GoogleUser.create({
          google_id: profile.id,
          display_name: profile.displayName,
          picture: profile.photos[0].value,
        });

        done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
