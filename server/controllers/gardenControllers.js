import Garden from '../db/models/Garden.js';
import { validationResult, matchedData } from 'express-validator';
import { isAuthorized } from '../utils/auth-utils.js';

export const createGarden = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  const { name, zipcode, address, description, image, is_public } =
    matchedData(req);

  const garden = Garden.create({
    name,
    zipcode,
    address,
    description,
    image,
    is_public,
    owner_id: req.user.id,
  });

  res.send(garden);
};

export const listGardens = async (req, res) => {
  const gardens = await Garden.list();
  res.send(gardens);
};

export const showGarden = async (req, res) => {
  const { id } = req.params;

  const garden = await Garden.find(id);
  if (!garden) return res.sendStatus(404);

  res.send(garden);
};

export const updateGarden = async (req, res) => {
  const { id } = req.params;
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  const { name, zipcode, address, description, image, is_public, owner_id } =
    matchedData(req);

  const garden = await Garden.find(id);
  if (!isAuthorized(garden.owner_id, req.session)) return res.sendStatus(403);

  const updatedGarden = await Garden.update({
    name: name ?? garden.name,
    description: description ?? garden.description,
    zipcode: zipcode ?? garden.zipcode,
    address: address ?? garden.address,
    image: image ?? garden.image,
    is_public: is_public ?? garden.is_public,
    id,
  });
  if (!updatedGarden) return res.sendStatus(404);
  res.send(updatedGarden);
};

export const showGardensByOwnerId = async (req, res) => {
  const { id } = req.params;
  const gardens = await Garden.findByOwnerId(id);
  if (!gardens) return res.sendStatus(404);
  res.send(gardens);
};

export const deleteGarden = async (req, res) => {
  const deleted = await Garden.delete(req.params.id);
  if (deleted) {
    res.status(204).end();
  } else {
    res.status(400).send('Error deleting garden');
  }
};
