import knex from '../knex.js';
import authUtils from '../../utils/auth-utils.js';

class Gathering {
  constructor({ title, location, description, host_id, garden_id = null, event_date, image}) {
    this.title = title;
    this.location = location;
    this.description = description;
    this.host_id = host_id;
    this.garden_id = garden_id;
    this.event_date = event_date;
    this.image = image;
  }

  static async list() {
    const query = `
    SELECT * 
    FROM events`;
    const { rows } = await knex.raw(query);
    return rows.map(event => new Gathering(event));
  }

  static async find(id) {
    const query = `
    SELECT * 
    FROM events
    WHERE id = ?`;
    const { rows } = await knex.raw(query, [id]);
    const event = rows[0];
    return event ? new Gathering(event) : null;
  }

  static async create({title, location, description, host_id, garden_id = null, event_date, image}) {
    const query = `
    INSERT INTO events (title, location, description, host_id, garden_id, event_date, image)
    VALUES (?, ?, ?, ?, ?, ?, ?) 
    RETURNING *`;
    const { rows } = await knex.raw(query, [title, location, description, host_id, garden_id, event_date, image]);
    return rows[0] ? new Gathering(rows[0]) : null;
  }

  static async update(id, { title, location, description, host_id, garden_id, event_date, image }) {
    const query = `
    UPDATE events
    SET title = ?, location = ?, description = ?, host_id = ?, garden_id = ?, event_date  = ? , image = ? 
    WHERE id = ?
    RETURNING *`;
    const { rows } = await knex.raw(query, [title, location, description, host_id, garden_id, event_date, image, id]);
    return rows[0] ? new Gathering(rows[0]) : null;
  }

  static async delete(id) {
    const query = `
    DELETE FROM events 
    WHERE id = ?`;
    await knex.raw(query, [id]);
  }

  static async deleteAll() {
    await knex.raw('DELETE FROM events');
  }
}

export default Gathering;
