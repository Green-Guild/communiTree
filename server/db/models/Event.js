import knex from '../knex.js';

export default class Event {
  constructor({
    id,
    title,
    zipcode,
    address,
    description,
    host_id,
    garden_id = null,
    event_date,
    image,
    created_at,
    updated_at,
  }) {
    this.id = id;
    this.title = title;
    this.zipcode = zipcode;
    this.address = address;
    this.description = description;
    this.host_id = host_id;
    this.garden_id = garden_id;
    this.event_date = event_date;
    this.image = image;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async list() {
    const query = `
    SELECT * 
    FROM events`;
    const { rows } = await knex.raw(query);
    return rows.map((event) => new Event(event));
  }

  static async find(id) {
    const query = `
    SELECT * 
    FROM events
    WHERE id = ?`;
    const { rows } = await knex.raw(query, [id]);
    const event = rows[0];
    return event ? new Event(event) : null;
  }

  static async findByHostId(host_id) {
    const query = `
    SELECT * 
    FROM events
    WHERE host_id = ?`;
    const { rows } = await knex.raw(query, [host_id]);
    return rows.map((event) => new Event(event));
  }

  static async create({
    title,
    zipcode,
    address,
    description,
    host_id,
    garden_id = null,
    event_date,
    image,
  }) {
    const query = `
    INSERT INTO events (title, zipcode, address, description, host_id, garden_id, event_date, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?) 
    RETURNING *`;
    const { rows } = await knex.raw(query, [
      title,
      zipcode,
      address,
      description,
      host_id,
      garden_id,
      event_date ?? 'NOW',
      image,
    ]);
    return rows[0] ? new Event(rows[0]) : null;
  }

  static async update({
    title,
    zipcode,
    address,
    description,
    garden_id,
    event_date,
    image,
    id,
  }) {
    const query = `
    UPDATE events
    SET title = ?, zipcode = ?, address = ?, description = ?, garden_id = ?, event_date  = ? , image = ? 
    WHERE id = ?
    RETURNING *`;
    const { rows } = await knex.raw(query, [
      title,
      zipcode,
      address,
      description,
      garden_id,
      event_date,
      image,
      id,
    ]);
    return rows[0] ? new Event(rows[0]) : null;
  }

  static async delete(id) {
    const query = `
    DELETE FROM events 
    WHERE id = ?`;
    try {
      await knex.raw(query, [id]);
    } catch (error) {}
  }

  static async deleteAll() {
    await knex.raw('DELETE FROM events');
  }
}
