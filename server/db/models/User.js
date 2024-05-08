import knex from '../knex.js';
import { isValidPassword, hashPassword } from '../../utils/auth-utils.js';

export default class User {
  #passwordHash = null;

  // only the isValidPassword instance method can access #passwordHash
  constructor({
    id,
    username,
    password_hash,
    location = null,
    display_name,
    google_id,
    image,
    age = null,
  }) {
    this.id = id;
    this.username = username;
    this.#passwordHash = password_hash;
    this.location = location;
    this.display_name = display_name;
    this.google_id = google_id;
    this.image = image;
    this.age = age;
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
    age = null,
    location = null,
    display_name,
    image,
  }) {
    const passwordHash = password ? await hashPassword(password) : null;

    const query = `INSERT INTO users (username, password_hash, age, location, display_name, image)
      VALUES (?, ?, ?, ?, ?, ?) RETURNING *`;
    const { rows } = await knex.raw(query, [
      username,
      passwordHash,
      age,
      location,
      display_name,
      image,
    ]);
    const user = rows[0];
    return new User(user);
  }

  static async createGoogleUser({
    google_id,
    age = null,
    location = null,
    display_name,
    image,
  }) {
    const query = `INSERT INTO users (google_id, age, location, display_name, image)
      VALUES (?, ?, ?, ?, ?) RETURNING *`;
    const { rows } = await knex.raw(query, [
      google_id,
      age,
      location,
      display_name,
      image,
    ]);
    const user = rows[0];
    return new User(user);
  }

  // TODO: fix update method
  static async update({
    id,
    username,
    password,
    age = null,
    location = null,
    display_name,
    image,
  }) {
    const query = `
      UPDATE users
      SET username=?, password_hash=?, age=?, location=?, display_name=?, image=?
      WHERE id=?
      RETURNING *
    `;
    const { rows } = await knex.raw(query, [
      id,
      username,
      password,
      age,
      location,
      display_name,
      image,
    ]);
    const updatedUser = rows[0];
    return updatedUser ? new User(updatedUser) : null;
  }

  static async deleteAll() {
    return knex('users').del();
  }
}
