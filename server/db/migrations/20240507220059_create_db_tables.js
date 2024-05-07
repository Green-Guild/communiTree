/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable('posts', (table) => {
      table.increments();
      table.string('title').notNullable();
      table.string('body').notNullable();
      table.integer('user_id').notNullable();
      table.integer('garden_id').nullable();
      table.integer('event_id').nullable();
      table.timestamps(true, true);
    })
    .createTable('gardens', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.string('location').notNullable();
      table.string('image').notNullable();
      table.string('description').notNullable();
      table.boolean('is_public').notNullable();
      table.integer('owner_id').nullable();
    })
    .createTable('comments', (table) => {
      table.increments();
      table.integer('post_id').notNullable();
      table.integer('user_id').notNullable();
      table.string('body').notNullable();
      table.timestamp(true, true);
    })
    .createTable('events', (table) => {
      table.increments();
      table.string('location').notNullable();
      table.string('description').notNullable();
      table.integer('host_id').notNullable();
      table.integer('garden_id').nullable();
      table.dateTime('date').notNullable();
      table.text('image').nullable();
      table.text('title').notNullable();
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .dropTable('posts')
    .dropTable('gardens')
    .dropTable('comments')
    .dropTable('events');
}
