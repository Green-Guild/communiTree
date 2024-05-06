/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return (
    knex.schema.createTable('posts',(table) => {
    table.increments();
    table.string('body').notNullable();
    table.integer('user_id').notNullable();
    table.integer('garden_id').nullable();
    table.integer('events_id').nullable();
  }),
    knex.schema.createTable('gardens',(table) => {
    table.increments();
    table.string('location').notNullable();
    table.string('picture').notNullable();
    table.string('description').notNullable();
    table.integer('owner_id').notNullableullable();
  }),
    knex.schema.createTable('comments',(table) => {
    table.increments();
    table.integer('post_id').notNullable();
    table.integer('user_id').notNullable();
    table.string('body').notNullable();
  }),
    knex.schema.createTable('events',(table) => {
    table.increments();
    table.string('location').notNullable();
    table.string('description').notNullable();
    table.integer('host_id').notNullable();
    table.integer('garden_id').nullable();
  })
)
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropTable('posts');
  knex.schema.dropTable('gardens');
  knex.schema.dropTable('comments');
  knex.schema.dropTable('events');
};
