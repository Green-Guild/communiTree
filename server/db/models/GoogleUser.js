import knex from '../knex.js';

export default class GoogleUser {
  constructor({ id, google_id, display_name, picture }) {
    this.id = id;
    this.google_id = google_id;
    this.display_name = display_name;
    this.picture = picture;
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

  static async findByGoogleId(google_id) {
    const query = `SELECT * FROM google_users WHERE google_id = ?`;
    const { rows } = await knex.raw(query, [google_id]);
    const user = rows[0];
    return user ? new GoogleUser(user) : null;
  }

  static async create({ google_id, display_name, picture }) {
    const query = `
      INSERT INTO google_users (google_id, display_name, picture)
      VALUES (?, ?, ?)
      RETURNING *`;
    const { rows } = await knex.raw(query, [google_id, display_name, picture]);
    return new GoogleUser(rows[0]);
  }
}
