/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .alterTable('gardens', (table) => {
      table.string('address').notNullable();
    })
    .alterTable('events', (table) => {
      table.string('address').notNullable();
    })
    .alterTable('gardens', (table) => {
      table.renameColumn('location', 'zipcode');
    })
    .alterTable('events', (table) => {
      table.renameColumn('location', 'zipcode');
    })
    .alterTable('users', (table) => {
      table.renameColumn('location', 'zipcode');
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .alterTable('gardens', (table) => {
      table.dropColumn('address');
    })
    .alterTable('events', (table) => {
      table.dropColumn('address');
    })
    .alterTable('gardens', (table) => {
      table.renameColumn('zipcode', 'location');
    })
    .alterTable('events', (table) => {
      table.renameColumn('zipcode', 'location');
    })
    .alterTable('users', (table) => {
      table.renameColumn('zipcode', 'location');
    });
}
