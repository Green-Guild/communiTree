import Post from '../db/models/Post.js';
import { validationResult, matchedData } from 'express-validator';
import { isAuthorized } from '../utils/auth-utils.js';
import { hash } from 'bcrypt';

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

export const showPostsByUserId = async (req, res) => {
  const { id } = req.params;
  const posts = await Post.findByUserId(id);
  if (!posts) return res.sendStatus(404);
  res.send(posts);
};

export const searchPosts = async (req, res) => {
  const { query } = req.params;
  const posts = await Post.search(query);
  if (!posts) return res.sendStatus(404);
  res.send(posts);
};

export const showPostsByHashtag = async (req, res) => {
  const { hashtag } = req.params;
  const posts = await Post.findByHashtag(hashtag);
  if (!posts) return res.sendStatus(404);
  res.send(posts);
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  const { title, body, garden_id, event_id } = matchedData(req);

  const post = await Post.find(id);
  if (!isAuthorized(post.user_id, req.session)) return res.sendStatus(403);

  const updatedPost = await Post.update({
    title: title ?? post.title,
    body: body ?? post.body,
    garden_id: garden_id ?? post.garden_id,
    event_id: event_id ?? post.event_id,
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
