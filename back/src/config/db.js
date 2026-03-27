import pg from "pg"
import 'dotenv/config';

pg.types.setTypeParser(1082, (val) => val);

const pool = new pg.Pool({
    user:process.env.USERDB,
    host:process.env.HOSTDB,
    database:process.env.DATABASEDB,
    password:process.env.PASSWORDDB,
    port:process.env.PORTDB
});

export default pool;