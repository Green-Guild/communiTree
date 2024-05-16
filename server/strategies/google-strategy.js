import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import User from "../db/models/User.js";
import dotenv from "dotenv";
dotenv.config();

export default passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/google/callback",
      scope: ["profile"],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const existingUser = await User.findByGoogleId(profile.id);

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await User.createGoogleUser({
          google_id: profile.id,
          display_name: profile.displayName,
          image: profile.photos[0].value,
        });

        done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);
