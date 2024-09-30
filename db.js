const { Database } = require('sqlite3')

const { Pool } = require('pg');

const pool = new Pool({
    user:"postgres",
    password:"Plasq21*",
    Database:"postgres",
    host:"localhost",
    port:"5432",
});

module.exports = pool;