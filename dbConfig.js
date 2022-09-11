const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: 'localhost',
    database: 'recipes',
    password: 'postP@$$w0rdJ3n',
    port: 5432
})

module.exports = pool;
