
import dotenv from "dotenv"
dotenv.config()

export default {
    development: {
        client: "postgresql",
        connection: {
            host:     process.env.HOSTDB,
            user:     process.env.USERDB,
            password: process.env.PASSWORDDB,
            database: process.env.DATABASEDB,
            port:     process.env.PORTDB,
        },
        migrations: {
            directory: "./migrations",
            tableName: "knex_migrations"
        },
        seeds: {
            directory: "./seeds"
        }
    }
}