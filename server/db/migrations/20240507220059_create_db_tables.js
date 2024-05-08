/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  return knex.schema
    .createTable('gardens', (table) => {
      table
        .uuid('id', { primaryKey: true })
        .defaultTo(knex.raw('uuid_generate_v4()'));

      table.string('name').notNullable();
      table.string('location').notNullable();
      table.string('image').notNullable();
      table.string('description').notNullable();
      table.boolean('is_public').notNullable();

      table.uuid('owner_id').nullable();
      table.foreign('owner_id').references('id').inTable('users');

      table.timestamps(true, true);
    })
    .createTable('events', (table) => {
      table
        .uuid('id', { primaryKey: true })
        .defaultTo(knex.raw('uuid_generate_v4()'));

      table.text('title').notNullable();
      table.string('description').notNullable();
      table.text('image').nullable();
      table.string('location').notNullable();
      table.dateTime('event_date').notNullable();

      table.uuid('host_id').notNullable();
      table.foreign('host_id').references('id').inTable('users');

      table.uuid('garden_id').nullable();
      table.foreign('garden_id').references('id').inTable('gardens');

      table.timestamps(true, true);
    })
    .createTable('posts', (table) => {
      table
        .uuid('id', { primaryKey: true })
        .defaultTo(knex.raw('uuid_generate_v4()'));

      table.string('title').notNullable();
      table.string('body').notNullable();

      table.uuid('user_id').notNullable();
      table.foreign('user_id').references('id').inTable('users');

      table.uuid('garden_id').nullable();
      table.foreign('garden_id').references('id').inTable('gardens');

      table.uuid('event_id').nullable();
      table.foreign('event_id').references('id').inTable('events');

      table.timestamps(true, true);
    })
    .createTable('comments', (table) => {
      table
        .uuid('id', { primaryKey: true })
        .defaultTo(knex.raw('uuid_generate_v4()'));

      table.string('body').notNullable();

      table.uuid('post_id').notNullable();
      table.foreign('post_id').references('id').inTable('posts');

      table.uuid('user_id').notNullable();
      table.foreign('user_id').references('id').inTable('users');

      table.timestamps(true, true);
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .dropTableIfExists('comments')
    .dropTableIfExists('posts')
    .dropTableIfExists('events')
    .dropTableIfExists('gardens');
}
