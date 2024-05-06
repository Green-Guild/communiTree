import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import GoogleUser from '../db/models/GoogleUser.js';

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
        console.log(profile);
        const existingUser = await GoogleUser.findByGoogleId(profile.id);

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await GoogleUser.create({
          googleId: profile.id,
          displayName: profile.displayName,
          picture: profile.photos[0].value,
        });

        done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
