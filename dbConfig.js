const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: 'localhost',
    database: 'cookbook',
    password: 'P@$$w0rd123',
    port: 5432
})

module.exports = pool;
