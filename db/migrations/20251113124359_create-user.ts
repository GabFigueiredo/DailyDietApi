import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.uuid("id").primary();
    table.string("email").notNullable();
    table.string("name").notNullable();
    table.string("password").notNullable();
  });

  await knex.schema.createTable("meals", (table) => {
    table.uuid("id").primary();
    table.string("name").notNullable();
    table.string("description").notNullable();
    table.timestamp("dateAndtime").notNullable();
    table.boolean("isOnDiet").notNullable();
    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users");
  await knex.schema.dropTable("meals");
}
