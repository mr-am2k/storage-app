const {Client} = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'admin',
    database: 'storage'
})

module.exports = client