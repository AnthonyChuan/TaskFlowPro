export function up(knex) {
    return knex.schema.createTable("comments", (table) => {
        table.increments("id_comentario").primary()
        table.string("contenido", 150).notNullable()
        table.integer("task_id").notNullable()
            .references("id_tarea").inTable("tasks")
            .onDelete("CASCADE")
        table.integer("user_id").notNullable()
            .references("id_usuario").inTable("users")
    })
}

export function down(knex) {
    return knex.schema.dropTable("comments")
}