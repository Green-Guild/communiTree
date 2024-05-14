import Comment from '../db/models/Comment.js';
import { validationResult, matchedData } from 'express-validator';
import { isAuthorized } from '../utils/auth-utils.js';

export const createComment = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  const { body, post_id } = matchedData(req);

  const comment = Comment.create({
    user_id: req.user.id,
    post_id,
    body,
  });

  res.send(comment);
};

export const listComments = async (req, res) => {
  const comment = await Comment.list();
  res.send(comment);
};

export const showComment = async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.find(id);
  if (!comment) return res.sendStatus(404);

  res.send(comment);
};
export const showCommentsByPostId = async (req, res) => {
  const { id } = req.params;
  const comments = await Comment.findByPostId(id);
  if (!comments) return res.sendStatus(404);
  res.send(comments);
};

export const updateComment = async (req, res) => {
  const { id } = req.params;
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  const { body } = matchedData(req);

  const comment = await Comment.find(id);
  if (!isAuthorized(comment.user_id, req.session)) return res.sendStatus(403);

  const updatedPost = await Comment.update({
    body: body ?? comment.body,
    id,
  });
  if (!updatedPost) return res.sendStatus(404);
  res.send(updatedPost);
};

export const deleteComment = async (req, res) => {
  const deleted = await Comment.delete(req.params.id);
  if (deleted) {
    res.status(204).end();
  } else {
    res.status(400).send('Error deleting comment');
  }
};
