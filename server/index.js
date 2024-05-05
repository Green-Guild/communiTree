import dotenv from 'dotenv';
dotenv.config();
import { join } from 'path';
import express from 'express';

import handleSessions from './middleware/handleSessions.js';
import { logRoutes } from './middleware/logRoutes.js';
import passport from 'passport';
import './strategies/local-strategy.js';

import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';

const app = express();

// middleware
app.use(handleCookieSessions); // adds a session property to each request representing the cookie
app.use(logRoutes); // print information about each incoming request
app.use(express.json()); // parse incoming request bodies as JSON
app.use(express.static(join(import.meta.dirname, '../frontend/dist'))); // Serve static assets from the dist folder of the frontend

app.use('/api', authRouter);
app.use('/api/users', userRouter);

// Requests meant for the API will be sent along to the router.
// For all other requests, send back the index.html file in the dist folder.
app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) return next();
  res.sendFile(join(import.meta.dirname, '../frontend/dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
