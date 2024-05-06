import knex from '../knex.js';
import { isValidPassword, hashPassword } from '../../utils/auth-utils.js';

export default class User {
  #passwordHash = null;

  // only the isValidPassword instance method can access #passwordHash
  constructor({ id, username, password_hash }) {
    this.id = id;
    this.username = username;
    this.#passwordHash = password_hash;
  }

  isValidPassword = async (password) => {
    return isValidPassword(password, this.#passwordHash);
  };

  static async list() {
    const query = `SELECT * FROM users`;
    const { rows } = await knex.raw(query);
    return rows.map((user) => new User(user));
  }

  static async find(id) {
    const query = `SELECT * FROM users WHERE id = ?`;
    const { rows } = await knex.raw(query, [id]);
    const user = rows[0];
    return user ? new User(user) : null;
  }

  static async findByUsername(username) {
    const query = `SELECT * FROM users WHERE username = ?`;
    const { rows } = await knex.raw(query, [username]);
    const user = rows[0];
    return user ? new User(user) : null;
  }

  static async create(username, password) {
    const passwordHash = await hashPassword(password);

    const query = `INSERT INTO users (username, password_hash)
      VALUES (?, ?) RETURNING *`;
    const { rows } = await knex.raw(query, [username, passwordHash]);
    const user = rows[0];
    return new User(user);
  }

  // TODO: fix update method
  static async update(id, username) {
    const query = `
      UPDATE users
      SET username=?
      WHERE id=?
      RETURNING *
    `;
    const { rows } = await knex.raw(query, [username, id]);
    const updatedUser = rows[0];
    return updatedUser ? new User(updatedUser) : null;
  }

  static async deleteAll() {
    return knex('users').del();
  }
}
