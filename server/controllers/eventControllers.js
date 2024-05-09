import Event from '../db/models/Event.js';
import { validationResult, matchedData } from 'express-validator';
import { isAuthorized } from '../utils/auth-utils.js';

export const createEvent = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  const { title, location, event_date, image, description, garden_id } =
    matchedData(req);

  const event = Event.create({
    title,
    description,
    location,
    event_date,
    garden_id,
    host_id: req.user.id,
    image,
  });

  res.send(event);
};

export const listEvents = async (req, res) => {
  const events = await Event.list();
  res.send(events);
};

export const showEvent = async (req, res) => {
  const { id } = req.params;

  const event = await Event.find(id);
  if (!event) return res.sendStatus(404);

  res.send(event);
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  const { title, location, event_date, image, description, garden_id } =
    matchedData(req);

  const event = await Event.find(id);
  if (!isAuthorized(event.host_id, req.session)) return res.sendStatus(403);

  console.log(event, title);

  const updatedEvent = await Event.update({
    title: title ?? event.title,
    location: location ?? event.location,
    event_date: event_date ?? event.event_date,
    image: image ?? event.image,
    description: description ?? event.description,
    garden_id: garden_id ?? event.garden_id,
    id,
  });
  console.log(updatedEvent);
  if (!updatedEvent) return res.sendStatus(404);
  res.send(updatedEvent);
};

export const deleteEvent = async (req, res) => {
  const deleted = await Event.delete(req.params.id);
  if (deleted) {
    res.status(204).end();
  } else {
    res.status(400).send('Error deleting event');
  }
};
