const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "tejas123",
    host: "localhost",
    port: 5432,
    database: "blog"
});

module.exports = pool;