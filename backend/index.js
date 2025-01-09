const db = require('./db-helpers/main.js')

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    db.connectToDB();
    res.sendFile(path.join(__dirname,"../public", 'index.html'));
}
);

app.get('/students', (req, res) => {
    res.sendFile(path.join(__dirname,"../public/pages/students", 'students.html'));
}
);

app.post('/login', (req, res) => {
    console.log(req.body);
    if(req.body.userType === 'admin'){
        db.getAdminUsers()
        .then((result) => {
            console.log(result.rows);
            res.send(result.rows);
        })
        .catch((e) => {
            console.error('Error getting admin users', e);
            res.send('Error getting admin users');
        });
    }
}
);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});