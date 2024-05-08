import Post from '../db/models/Post.js';
import { validationResult, matchedData } from 'express-validator';
import { isAuthorized } from '../utils/auth-utils.js';

export const createPost = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  const { title, body, garden_id, event_id } = matchedData(req);

  const post = Post.create({
    title,
    body,
    garden_id,
    event_id,
    user_id: req.user.id,
  });

  res.send(post);
};

export const listPosts = async (req, res) => {
  const posts = await Post.list();
  res.send(posts);
};

export const showPost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.find(id);
  if (!post) return res.sendStatus(404);

  res.send(post);
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  const { title, body, garden_id, event_id } = matchedData(req);

  console.log(title, body, garden_id, event_id, id);
  const post = await Post.find(id);
  if (!isAuthorized(post.user_id, req.session)) return res.sendStatus(403);

  const updatedPost = await Post.update({
    title,
    body,
    garden_id,
    event_id,
    id,
  });
  if (!updatedPost) return res.sendStatus(404);
  res.send(updatedPost);
};

export const deletePost = async (req, res) => {
  const deleted = await Post.delete(req.params.id);
  if (deleted) {
    res.status(204).end();
  } else {
    res.status(400).send('Error deleting post');
  }
};
