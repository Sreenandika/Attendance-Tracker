const funcs = require('./db-helpers/main.js')
const db = require('./db-helpers/const.js');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const { Pool } = require('pg');
const pool = new Pool({
    user: db.user,
    host: db.host,
    database: db.database,
    password: db.password,
    port: db.port,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public", 'index.html'));
}
);

app.get('/students', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/pages/students", 'students.html'));
}
);


app.post('/login', async (req, res) => {
    const client = await pool.connect();
    if(req.body.userType === 'admin'){
        const dataToSend = {
            user_id: 'no_user_found',
            loginStatus: false
        };
        funcs.getAdminUsers(client)
        .then((result) => {
            console.log(result.rows);
            for(let i = 0; i < result.rows.length; i++){
                if(req.body.username === result.rows[i].username && req.body.password === result.rows[i].password){
                    dataToSend.user_id = result.rows[i].user_id;
                    dataToSend.loginStatus = true;
                    break;
                }
            }
            res.send(dataToSend);
        })
        .catch((e) => {
            console.error('Error getting admin users', e);
            res.send('Error getting admin users');
        });
    }
    if(req.body.userType === 'student'){
        funcs.getStudentUsers(client)
        .then((result) => {
            console.log(result.rows);
            if(req.body.username === result.rows[0].username && req.body.password === result.rows[0].password){
                res.send('Login successful');
            }
            else{
                res.send('Login failed');
            }
        })
        .catch((e) => {
            console.error('Error getting student users', e);
            res.send('Error getting student users');
        });
    }
    client.release();
});

app.get('/admin/:admin_id', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/pages/admin", 'admin.html'));
});




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});