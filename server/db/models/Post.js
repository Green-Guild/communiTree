import knex from '../knex.js';

export default class Post {
  constructor({
    id,
    title,
    body,
    user_id,
    garden_id = null,
    event_id = null,
    hashtags = [],
    created_at,
    updated_at,
  }) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.user_id = user_id;
    this.garden_id = garden_id;
    this.event_id = event_id;
    this.hashtags = hashtags;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async list() {
    const query = `
    SELECT * 
    FROM posts
    ORDER BY created_at DESC`;
    const { rows } = await knex.raw(query);

    return rows.map((posts) => new Post(posts));
  }

  static async find(id) {
    const query = `
    SELECT * 
    FROM posts 
    WHERE id = ?`;
    const { rows } = await knex.raw(query, [id]);
    const post = rows[0];
    return post ? new Post(post) : null;
  }

  static async findByUserId(user_id) {
    const query = `
    SELECT * 
    FROM posts 
    WHERE user_id = ?
    ORDER BY created_at DESC`;
    const { rows } = await knex.raw(query, [user_id]);
    return rows.map((post) => new Post(post));
  }

  static async search(query) {
    const searchQuery = `
      SELECT * 
      FROM posts 
      WHERE title ILIKE ? OR body ILIKE ?
      ORDER BY created_at DESC`;

    const { rows } = await knex.raw(searchQuery, [`%${query}%`, `%${query}%`]);
    return rows.map((post) => new Post(post));
  }

  static async findByHashtag(hashtag) {
    const query = `
    SELECT * 
    FROM posts 
    WHERE ? = ANY(hashtags)
    ORDER BY created_at DESC`;
    const { rows } = await knex.raw(query, [hashtag]);
    return rows.map((post) => new Post(post));
  }

  static async create({
    title,
    body,
    user_id,
    garden_id = null,
    event_id = null,
  }) {
    const hashtags = body.match(/#\w+/g) || [];
    const cleanedHashtags = hashtags.map((hashtag) => hashtag.slice(1));

    const query = `
    INSERT INTO posts (title, body, user_id, garden_id, event_id, hashtags)
    VALUES (?, ?, ?, ?, ?, ?) 
    RETURNING *`;

    const { rows } = await knex.raw(query, [
      title,
      body,
      user_id,
      garden_id,
      event_id,
      cleanedHashtags,
    ]);
    return rows[0] ? new Post(rows[0]) : null;
  }

  static async update({ title, body, garden_id = null, event_id = null, id }) {
    const hashtags = body.match(/#\w+/g) || [];
    const cleanedHashtags = hashtags.map((hashtag) => hashtag.slice(1));

    const query = `
    UPDATE posts
    SET title = ?, body = ?, garden_id = ?, event_id = ?, hashtags = ?
    WHERE id = ?
    RETURNING *`;

    const { rows } = await knex.raw(query, [
      title,
      body,
      garden_id,
      event_id,
      cleanedHashtags,
      id,
    ]);

    return rows[0] ? new Post(rows[0]) : null;
  }

  static async delete(id) {
    const deleteCommentsQuery = `
    DELETE FROM comments 
    WHERE post_id = ?`;
    await knex.raw(deleteCommentsQuery, [id]);

    const deletePostQuery = `
    DELETE FROM posts 
    WHERE id = ?`;
    const res = await knex.raw(deletePostQuery, [id]);

    return res.rowCount > 0;
  }

  static async deleteAll() {
    await knex.raw('DELETE FROM posts');
  }
}
