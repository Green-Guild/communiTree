import express from 'express';
import { checkSchema } from 'express-validator';
import {
  createCommentValidationSchema,
  updateCommentValidationSchema,
} from '../utils/validationSchemas/commentValidationSchema.js';
import {
  listComments,
  showComment,
  createComment,
  updateComment,
  deleteComment,
  showCommentsByPostId,
} from '../controllers/commentControllers.js';
import checkAuthentication from '../middleware/checkAuthentication.js';

const commentRouter = express.Router();

commentRouter.post(
  '/',
  checkSchema(createCommentValidationSchema),
  createComment
);
commentRouter.get('/', checkAuthentication, listComments);
commentRouter.get('/:id', checkAuthentication, showComment);
commentRouter.get('/post/:id', checkAuthentication, showCommentsByPostId);
commentRouter.patch(
  '/:id',
  checkAuthentication,
  checkSchema(updateCommentValidationSchema),
  updateComment
);
commentRouter.delete('/:id', checkAuthentication, deleteComment);

export default commentRouter;
