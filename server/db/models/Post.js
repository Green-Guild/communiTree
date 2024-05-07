import knex from '../knex.js';
import authUtils from '../../utils/auth-utils.js';

class Post {
  constructor({ title, body, user_id, garden_id = null, event_id = null}) {
    this.title = title;
    this.body = body;
    this.user_id = user_id;
    this.garden_id = garden_id;
    this.event_id = event_id;
  }

  static async list() {
    const query = `
    SELECT * 
    FROM posts`;
    const { rows } = await knex.raw(query);
    return rows.map(posts => new Post(posts));
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

  static async create({title, body, user_id, garden_id = null, event_id = null }) {
    const query = `
    INSERT INTO posts (title, body, user_id, garden_id, event_id)
    VALUES (?, ?, ?, ?, ?) 
    RETURNING *`;
    const { rows } = await knex.raw(query, [title, body, user_id, garden_id, event_id]);
    return rows[0] ? new Post(rows[0]) : null;
  }

  static async update(id, { title, body, garden_id = null, event_id = null }) {
    const query = `
    UPDATE posts
    SET title = ?, body = ?, garden_id = ?, event_id = ?
    WHERE id = ?
    RETURNING *`;
    const { rows } = await knex.raw(query, [title, body, garden_id, event_id, id]);
    return rows[0] ? new Post(rows[0]) : null;
  }

  static async delete(id) {
    const query = `
    DELETE FROM posts 
    WHERE id = ?`;
    await knex.raw(query, [id]);
  }

  static async deleteAll() {
    await knex.raw('DELETE FROM posts');
  }
}

export default Post;
