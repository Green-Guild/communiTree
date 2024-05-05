import dotenv from 'dotenv';
dotenv.config();

import session from 'express-session';
const handleSessions = session({
  name: 'session',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  //   cookie: {
  //     maxAge: 1000 * 60 * 60 * 24, // 24 hours
  //   },
});

export default handleSessions;
