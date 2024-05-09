import knex from '../knex.js';

export default class Comment {
  constructor({ id, post_id, user_id, body, created_at, updated_at }) {
    this.id = id;
    this.post_id = post_id;
    this.user_id = user_id;
    this.body = body;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async list() {
    const query = `
    SELECT * 
    FROM comments`;
    const { rows } = await knex.raw(query);
    return rows.map((comment) => new Comment(comment));
  }

  static async find(id) {
    const query = `
    SELECT * 
    FROM comments
    WHERE id = ?`;
    const { rows } = await knex.raw(query, [id]);
    const comment = rows[0];
    return comment ? new Comment(comment) : null;
  }

  static async findByPostId(post_id) {
    const query = `
    SELECT * 
    FROM comments
    WHERE post_id = ?`;
    const { rows } = await knex.raw(query, [post_id]);
    return rows.map((comment) => new Comment(comment));
  }

  static async create({ post_id, user_id, body }) {
    const query = `
    INSERT INTO comments (post_id, user_id, body)
    VALUES (?, ?, ?) 
    RETURNING *`;
    const { rows } = await knex.raw(query, [post_id, user_id, body]);
    return rows[0] ? new Comment(rows[0]) : null;
  }

  static async update({ body, id }) {
    const query = `
    UPDATE comments
    SET body = ?
    WHERE id = ?
    RETURNING *`;
    const { rows } = await knex.raw(query, [body, id]);
    return rows[0] ? new Comment(rows[0]) : null;
  }

  static async delete(id) {
    const query = `
    DELETE FROM comments 
    WHERE id = ?`;
    await knex.raw(query, [id]);
  }

  static async deleteAll() {
    await knex.raw('DELETE FROM comments');
  }
}
