const db = require('./const.js');
const { Client } = require('pg');
const client = new Client({
    user: db.user,
    host: db.host,
    database: db.database,
    password: db.password,
    port: db.port,
});

function connectToDB() {
    client.connect()
        .then(() => console.log('Connected to the database'))
        .catch(e => console.error('Error connecting to the database', e));
};

function getAdminUsers(){
    const query = `SELECT username,password FROM user_accounts WHERE role = 'admin'`;
    return client.query(query);
}
module.exports = {
    connectToDB,
    getAdminUsers
}