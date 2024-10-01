const { Database } = require('sqlite3')

const { Pool } = require('pg');

const pool = new Pool({
    user:"postgres",
    password:"Plasq21*",
    Database:"postgres",
    host:"localhost",
    port:"5432",
});

pool.connect((err, contacts, release) => {
    if (err) {
        return console.error('Error acquiring contacts', err.stack);
    }
    console.log('Connected to PostgreSQL database');
});

module.exports = pool;