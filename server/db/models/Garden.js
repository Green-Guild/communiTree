import knex from '../knex.js';

export default class Garden {
  constructor({
    id,
    name,
    zipcode,
    address,
    image,
    description,
    is_public = false,
    owner_id = null,
    created_at,
    updated_at,
  }) {
    this.id = id;
    this.name = name;
    this.zipcode = zipcode;
    this.address = address;
    this.image = image;
    this.description = description;
    this.is_public = is_public;
    this.owner_id = owner_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async list() {
    const query = `
    SELECT * 
    FROM gardens
    ORDER BY created_at DESC`;
    const { rows } = await knex.raw(query);

    return rows.map((garden) => new Garden(garden));
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

  static async findByOwnerId(owner_id) {
    const query = `
    SELECT * 
    FROM gardens 
    WHERE owner_id = ?
    ORDER BY created_at DESC`;
    const { rows } = await knex.raw(query, [owner_id]);
    return rows.map((garden) => new Garden(garden));
  }

  static async create({
    name,
    zipcode,
    address,
    image,
    description,
    is_public = false,
    owner_id,
  }) {
    const query = `
    INSERT INTO gardens (name, zipcode, address, image, description, is_public, owner_id)
    VALUES ( ?, ?, ?, ?, ?, ?, ?) 
    RETURNING *`;
    const { rows } = await knex.raw(query, [
      name,
      zipcode,
      address,
      image,
      description,
      is_public,
      owner_id,
    ]);
    return rows[0] ? new Garden(rows[0]) : null;
  }

  static async update({
    name,
    zipcode,
    address,
    image,
    description,
    is_public = false,
    id,
  }) {
    const query = `
    UPDATE gardens
    SET name = ?, zipcode = ?, address = ?, image = ?, description = ?, is_public = ?
    WHERE id = ?
    RETURNING *`;
    const { rows } = await knex.raw(query, [
      name,
      zipcode,
      address,
      image,
      description,
      is_public,
      id,
    ]);

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
