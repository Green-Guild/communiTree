import knex from '../knex.js';
import authUtils from '../../utils/auth-utils.js';

class Garden {
  constructor({ name, location, image, description, public = false, owner_id = null}) {
    this.name = name;
    this.location = location;
    this.image = image;
    this.description = description;
    this.public = public
    this.owner_id = owner_id;
  }

  static async list() {
    const query = `
    SELECT * 
    FROM gardens`;
    const { rows } = await knex.raw(query);
    return rows.map(garden => new Garden(garden));
  }

  static async find(id) {
    const query = `
    SELECT * 
    FROM gardens 
    WHERE id = ?`;
    const { rows } = await knex.raw(query, [id]);
    const garden = rows[0];
    return garden ? new Garden(garden) : null;
  }

  static async create({name,location, image, description, public = false, owner_id = null}) {
    const query = `
    INSERT INTO gardens (name, location, image, description, public, owner_id)
    VALUES ( ?, ?, ?, ?, ?, ?) 
    RETURNING *`;
    const { rows } = await knex.raw(query, [name, location, image, description, public, owner_id]);
    return rows[0] ? new Garden(rows[0]) : null;
  }

  static async update(id, { name, location, image, description, public = false, owner_id }) {
    const query = `
    UPDATE gardens
    SET name = ? location = ?, image = ?, description = ?, public = ?, owner_id  = ? 
    WHERE id = ?
    RETURNING *`;
    const { rows } = await knex.raw(query, [name,location, image, description, public, owner_id, id]);
    return rows[0] ? new Garden(rows[0]) : null;
  }

  static async delete(id) {
    const query = `
    DELETE FROM gardens 
    WHERE id = ?`;
    await knex.raw(query, [id]);
  }

  static async deleteAll() {
    await knex.raw('DELETE FROM gardens');
  }
}

export default Garden;
