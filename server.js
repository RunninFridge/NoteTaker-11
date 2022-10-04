//dependencies
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const Notes = require('./Develop/db/db.json');

//set up for the Express to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use('./assets', express.static('./assets'));

app.get('/api/notes', (req, res) => {
    res.json(Notes.slice(1));
});

app.get('/', (req, res) => {
    
})