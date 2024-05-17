import { isAuthorized } from '../utils/auth-utils.js';
import User from '../db/models/User.js';
import { matchedData, validationResult } from 'express-validator';

export const createUser = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  const { username, password, display_name, zipcode, image } = matchedData(req);

  const existingUser = await User.findByUsername(username);
  if (existingUser) {
    return res.status(400).send({ error: 'Username is already taken.' });
  }

  const user = await User.createLocalUser({
    username,
    password,
    display_name,
    zipcode,
    image,
  });

  res.send(user);
};

export const listUsers = async (req, res) => {
  const users = await User.list();
  res.send(users);
};

export const showUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.find(id);
  if (!user) return res.sendStatus(404);

  res.send(user);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  const { username, display_name, zipcode, image } = matchedData(req);

  const user = await User.find(id);
  if (!isAuthorized(id, req.session)) return res.sendStatus(403);

  const updatedUser = await User.updateUser({
    id,
    username: username ?? user.username,
    display_name: display_name ?? user.display_name,
    zipcode: zipcode ?? user.zipcode,
    image: image ?? user.image,
  });
  if (!updatedUser) return res.sendStatus(404);
  res.send(updatedUser);
};

export const updatePassword = async (req, res) => {
  const { id } = req.params;
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  const { oldPassword, newPassword } = matchedData(req);

  if (!isAuthorized(id, req.session)) return res.sendStatus(403);

  const updatedUser = await User.updatePassword({
    id,
    oldPassword,
    newPassword,
  });
  if (!updatedUser) return res.sendStatus(404);
  res.send(updatedUser);
};
