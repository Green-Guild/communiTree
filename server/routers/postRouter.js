import express from 'express';
import { checkSchema } from 'express-validator';
import {
  createPostValidationSchema,
  updatePostValidationSchema,
} from '../utils/validationSchemas/postValidationSchema.js';
import {
  listPosts,
  showPost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postControllers.js';
import checkAuthentication from '../middleware/checkAuthentication.js';

const postRouter = express.Router();

postRouter.post('/', checkSchema(createPostValidationSchema), createPost);
postRouter.get('/', checkAuthentication, listPosts);
postRouter.get('/:id', checkAuthentication, showPost);
postRouter.patch(
  '/:id',
  checkAuthentication,
  checkSchema(updatePostValidationSchema),
  updatePost
);
postRouter.delete('/:id', checkAuthentication, deletePost);

export default postRouter;
