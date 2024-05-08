import Reply from '../db/models/Reply.js';
import { validationResult, matchedData } from 'express-validator';
import { isAuthorized } from '../utils/auth-utils.js';

export const createComment = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  const { body, post_id } = matchedData(req);

  console.log(post_id, req.user.id);
  const comment = Reply.create({
    user_id: req.user.id,
    post_id,
    body,
  });

  res.send(comment);
};

export const listComments = async (req, res) => {
  const comment = await Reply.list();
  res.send(comment);
};

export const showComment = async (req, res) => {
  const { id } = req.params;

  const comment = await Reply.find(id);
  if (!comment) return res.sendStatus(404);

  res.send(comment);
};

export const updateComment = async (req, res) => {
  const { id } = req.params;
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  const { post_id, body } = matchedData(req);

  const comment = await Reply.find(id);
  if (!isAuthorized(comment.user_id, req.session)) return res.sendStatus(403);

  const updatedPost = await Reply.update({
    body,
    post_id,
    id,
  });
  if (!updatedPost) return res.sendStatus(404);
  res.send(updatedPost);
};

export const deleteComment = async (req, res) => {
  const deleted = await Reply.delete(req.params.id);
  if (deleted) {
    res.status(204).end();
  } else {
    res.status(400).send('Error deleting comment');
  }
};
