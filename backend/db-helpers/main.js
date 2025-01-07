const db = require('./const.js');
const {Client} = require('pg');
const client = new Client({
    user: db.user,
    host: db.host,
    database: db.database,
    password: db.password,
    port: db.port,
});

function connectToDB() {
    if(client._connected) {
        console.log('Already connected to the database');
     client.query('SELECT NOW()', (err, res) => {
         if (err) {
             console.error('Error executing query', err);
         } else {
             console.log('Query executed successfully', res.rows);
         }
     }
     );
    return;
    }
    client.connect()
        .then(() => console.log('Connected to the database'))
        .catch(e => console.error('Error connecting to the database', e));
    client.query('SELECT NOW()', (err, res) => {
        if (err) {
            console.error('Error executing query', err);
        } else {
            console.log('Query executed successfully', res.rows);
        }
    }
    );
};

module.exports = {
    connectToDB
}