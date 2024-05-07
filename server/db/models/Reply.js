import knex from '../knex.js';
import authUtils from '../../utils/auth-utils.js';

class Reply {
  constructor({ post_id, user_id, body}) {
    this.post_id = post_id;
    this.user_id = user_id;
    this.body = body;
  }

  static async list() {
    const query = `
    SELECT * 
    FROM comments`;
    const { rows } = await knex.raw(query);
    return rows.map(comment => new Reply(comment));
  }

  static async find(id) {
    const query = `
    SELECT * 
    FROM comments
    WHERE id = ?`;
    const { rows } = await knex.raw(query, [id]);
    const comment = rows[0];
    return comment ? new Reply(comment) : null;
  }

  static async create({post_id, user_id, body}) {
    const query = `
    INSERT INTO comments (post_id, user_id, body)
    VALUES (?, ?, ?) 
    RETURNING *`;
    const { rows } = await knex.raw(query, [post_id, user_id, body]);
    return rows[0] ? new Reply(rows[0]) : null;
  }

  static async update(id, { post_id, user_id, body}) {
    const query = `
    UPDATE comments
    SET post_id = ?, user_id = ?, body = ?
    WHERE id = ?
    RETURNING *`;
    const { rows } = await knex.raw(query, [post_id, user_id, body]);
    return rows[0] ? new Reply(rows[0]) : null;
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

export default Reply;