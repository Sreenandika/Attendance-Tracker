const db = require('./db-helpers/main.js')

const express = require('express');
const path = require('path');

const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"../public", 'index.html'));
}
);
app.get('/api', (req, res) => {
    const lmao = db.connectToDB();
    res.json({ lmao });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});