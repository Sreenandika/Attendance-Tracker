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
    console.log(client);
};

function getAdminUsers(){
    const query = `SELECT username,password FROM user_accounts WHERE user_role = 'admin';`;
    client.query(query).then((result) => {
        const users = result.rows;
        console.log(users);
    }
    )
    
}

function closeConnection(){
   client.end();
}
module.exports = {
    connectToDB,
    getAdminUsers,
    closeConnection
}