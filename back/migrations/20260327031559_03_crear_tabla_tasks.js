export function up(knex) {
    return knex.schema.createTable("tasks", (table) => {
        table.increments("id_tarea").primary()
        table.string("titulo", 50).notNullable()
        table.string("descripcion", 150).notNullable()
        table.string("estado", 50).defaultTo("TODO")
        table.string("prioridad", 50).notNullable()
        table.integer("project_id").notNullable()
            .references("id_proyecto").inTable("projects")
            .onDelete("CASCADE")
        table.integer("assigned_to").notNullable()
            .references("id_usuario").inTable("users")
        table.integer("created_by").notNullable()
            .references("id_usuario").inTable("users")
        table.date("due_date").notNullable()
        table.timestamp("created_at").defaultTo(knex.fn.now())
    })
}

export function down(knex) {
    return knex.schema.dropTable("tasks")
}