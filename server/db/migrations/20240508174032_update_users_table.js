/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable('users', (table) => {
    table.string('google_id').nullable().alter();

    table.string('username').nullable().alter();
    table.string('password_hash').nullable().alter();

    table.string('display_name').notNullable().alter();
    table.integer('age').nullable().alter();
    table.string('location').nullable().alter();
    table.string('image').notNullable().alter();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.alterTable('users', (table) => {
    table.string('google_id').nullable().alter();
    table.string('username').nullable().alter();
    table.string('password_hash').nullable().alter();
    table.string('display_name').notNullable().alter();
    table.integer('age').nullable().alter();
    table.string('location').nullable().alter();
    table.string('image').notNullable().alter();
  });
}
