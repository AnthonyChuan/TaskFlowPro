export function up(knex) {
    return knex.schema.createTable("projects", (table) => {
        table.increments("id_proyecto").primary()
        table.string("nombre", 100).notNullable()
        table.string("descripcion", 100).notNullable()
        table.string("estado", 50).defaultTo("ACTIVO")
        table.integer("owner_id").notNullable()
            .references("id_usuario").inTable("users")
        table.timestamp("created_at").defaultTo(knex.fn.now())
        table.timestamp("update_at")
    })
}

export function down(knex) {
    return knex.schema.dropTable("projects")
}