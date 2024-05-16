import express from 'express';
import { checkSchema } from 'express-validator';
import {
  createEventValidationSchema,
  updateEventValidationSchema,
} from '../utils/validationSchemas/eventValidationSchema.js';
import {
  listEvents,
  showEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  showEventsByHostId,
} from '../controllers/eventControllers.js';
import checkAuthentication from '../middleware/checkAuthentication.js';

const eventRouter = express.Router();

eventRouter.post('/', checkSchema(createEventValidationSchema), createEvent);
eventRouter.get('/', checkAuthentication, listEvents);
eventRouter.get('/:id', checkAuthentication, showEvent);
eventRouter.get('/user/:id', checkAuthentication, showEventsByHostId);
eventRouter.patch(
  '/:id',
  checkAuthentication,
  checkSchema(updateEventValidationSchema),
  updateEvent
);
eventRouter.delete('/:id', checkAuthentication, deleteEvent);

export default eventRouter;
