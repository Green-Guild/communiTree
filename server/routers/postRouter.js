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
  showPostsByUserId,
  searchPosts,
  showPostsByHashtag,
} from '../controllers/postControllers.js';
import checkAuthentication from '../middleware/checkAuthentication.js';

const postRouter = express.Router();

postRouter.post('/', checkSchema(createPostValidationSchema), createPost);
postRouter.get('/', listPosts);
postRouter.get('/:id', showPost);
postRouter.get('/user/:id', showPostsByUserId);
postRouter.get('/search/:query', searchPosts);
postRouter.get('/search/hashtag/:hashtag', showPostsByHashtag);
postRouter.patch(
  '/:id',
  checkAuthentication,
  checkSchema(updatePostValidationSchema),
  updatePost
);
postRouter.delete('/:id', checkAuthentication, deletePost);

export default postRouter;
