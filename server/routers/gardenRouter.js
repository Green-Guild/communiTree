import express from 'express';
import { checkSchema } from 'express-validator';
import {
  createGardenValidationSchema,
  updateGardenValidationSchema,
} from '../utils/validationSchemas/gardenValidationSchema.js';
import {
  listGardens,
  showGarden,
  createGarden,
  updateGarden,
  deleteGarden,
  showGardensByOwnerId,
} from '../controllers/gardenControllers.js';
import checkAuthentication from '../middleware/checkAuthentication.js';

const gardenRouter = express.Router();

gardenRouter.post('/', checkSchema(createGardenValidationSchema), createGarden);
gardenRouter.get('/', listGardens);
gardenRouter.get('/:id', showGarden);
gardenRouter.get('/user/:id', checkAuthentication, showGardensByOwnerId);
gardenRouter.patch(
  '/:id',
  checkAuthentication,
  checkSchema(updateGardenValidationSchema),
  updateGarden
);
gardenRouter.delete('/:id', checkAuthentication, deleteGarden);

export default gardenRouter;
