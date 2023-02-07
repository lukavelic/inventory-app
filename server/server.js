const express = require('express');
const dbConnect = require('./db/dbConnect');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

dbConnect()

app.get('/', (req, res) => {
    res.json({ msg: 'Hey'})
})

app.listen(PORT, () => { console.log(`Server started on port: ${PORT}`)})