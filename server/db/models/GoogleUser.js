import knex from '../knex.js';

export default class GoogleUser {
  constructor({ id, googleId, displayName, photo }) {
    this.id = id;
    this.googleId = googleId;
    this.displayName = displayName;
    this.photo = photo;
  }

  static async list() {
    const query = `SELECT * FROM google_users`;
    const { rows } = await knex.raw(query);
    return rows.map((user) => new GoogleUser(user));
  }

  static async find(id) {
    const query = `SELECT * FROM google_users WHERE id = ?`;
    const { rows } = await knex.raw(query, [id]);
    const user = rows[0];
    return user ? new GoogleUser(user) : null;
  }

  static async findByGoogleId(googleId) {
    const query = `SELECT * FROM google_users WHERE google_id = ?`;
    const { rows } = await knex.raw(query, [googleId]);
    const user = rows[0];
    return user ? new GoogleUser(user) : null;
  }

  static async create({ googleId, displayName, picture }) {
    const query = `
      INSERT INTO google_users (google_id, display_name, picture)
      VALUES (?, ?, ?)
      RETURNING *`;
    const { rows } = await knex.raw(query, [googleId, displayName, picture]);
    return new GoogleUser(rows[0]);
  }
}
