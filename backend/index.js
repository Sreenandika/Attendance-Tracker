const db = require('./db-helpers/main.js')

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"../public", 'index.html'));
    
    db.connectToDB();
}
);

app.get('/students', (req, res) => {
    res.sendFile(path.join(__dirname,"../public/pages/students", 'students.html'));
}
);

app.post('/login', (req, res) => {
    if(req.body.userType === 'admin'){
        db.getAdminUsers();
        // const users = db.getAdminUsers();
        // console.log(users);
        // db.closeConnection();
}
}
);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});