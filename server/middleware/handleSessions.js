import dotenv from 'dotenv';
dotenv.config();

import session from 'express-session';
import KnexSessionStore from 'connect-session-knex';
import knex from '../db/knex.js';

const handleSessions = session({
  name: 'session',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
  },
  store: new (KnexSessionStore(session))({
    knex,
    tablename: 'sessions',
  }),
});

export default handleSessions;
