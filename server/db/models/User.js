import knex from '../knex.js';
import { isValidPassword, hashPassword } from '../../utils/auth-utils.js';

export default class User {
  #passwordHash = null;

  // only the isValidPassword instance method can access #passwordHash
  constructor({
    id,
    username,
    password_hash,
    zipcode = null,
    display_name,
    google_id,
    image,
    created_at,
    updated_at,
  }) {
    this.id = id;
    this.username = username;
    this.#passwordHash = password_hash;
    this.zipcode = zipcode;
    this.display_name = display_name;
    this.google_id = google_id;
    this.image = image;
    this.created_at = created_at;
    this.updated_at = updated_at;
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

  static async findByGoogleId(google_id) {
    const query = `SELECT * FROM users WHERE google_id = ?`;
    const { rows } = await knex.raw(query, [google_id]);
    const user = rows[0];
    return user ? new User(user) : null;
  }

  static async createLocalUser({
    username,
    password,
    zipcode = null,
    display_name,
    image = null,
  }) {
    const passwordHash = password ? await hashPassword(password) : null;

    const query = `INSERT INTO users (username, password_hash, zipcode, display_name, image)
      VALUES (?, ?, ?, ?, ?) RETURNING *`;
    const { rows } = await knex.raw(query, [
      username,
      passwordHash,
      zipcode,
      display_name,
      image,
    ]);
    const user = rows[0];
    return new User(user);
  }

  static async createGoogleUser({
    google_id,
    zipcode = null,
    display_name,
    image,
  }) {
    const query = `INSERT INTO users (google_id, zipcode, display_name, image)
      VALUES (?, ?, ?, ?) RETURNING *`;
    const { rows } = await knex.raw(query, [
      google_id,
      zipcode,
      display_name,
      image,
    ]);
    const user = rows[0];
    return new User(user);
  }

  static async updatePassword({ oldPassword, id, newPassword }) {
    const user = await User.find(id);
    if (!user) {
      throw new Error('User not found');
    }

    const isValidOldPassword = await user.isValidPassword(oldPassword);
    if (!isValidOldPassword) {
      throw new Error('Invalid old password');
    }

    const passwordHash = newPassword ? await hashPassword(newPassword) : null;

    const query = `
      UPDATE users
      SET password_hash=?
      WHERE id=?
      RETURNING *
    `;
    const { rows } = await knex.raw(query, [passwordHash, id]);
    const updatedUser = rows[0];
    return updatedUser ? new User(updatedUser) : null;
  }

  static async updateUser({ id, username, zipcode, display_name, image }) {
    const user = await User.find(id);
    if (!user) {
      throw new Error('User not found');
    }

    const query = `
      UPDATE users
      SET username=?, zipcode=?, display_name=?, image=?
      WHERE id=?
      RETURNING *
    `;
    const { rows } = await knex.raw(query, [
      username,
      zipcode,
      display_name,
      image,
      id,
    ]);
    const updatedUser = rows[0];
    return updatedUser ? new User(updatedUser) : null;
  }

  static async deleteAll() {
    return knex('users').del();
  }
}
