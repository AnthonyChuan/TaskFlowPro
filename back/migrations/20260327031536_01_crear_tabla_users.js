export function up(knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("id_usuario").primary()
        table.string("nombre", 100).notNullable()
        table.string("email", 150).unique()
        table.string("password", 150).notNullable()
        table.integer("rol").defaultTo(1)
        table.timestamp("created_at").defaultTo(knex.fn.now())
        table.timestamp("update_at")
        table.boolean("activo").defaultTo(true)
    })
}

export function down(knex) {
    return knex.schema.dropTable("users")
}