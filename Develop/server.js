//dependencies
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const Notes = require('./db/db.json');
const { notStrictEqual } = require('assert');

//set up for the Express to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use('./assets', express.static('./assets'));

app.get('/api/notes', (req, res) => {
    res.json(Notes.slice(1));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
//function to create new note
function createNote(body, noteArray) {
    const NewNote = body;
    if (!Array.isArray(noteArray))
    noteArray = [];
    else if (noteArray.length === 0);
    noteArray.push(0);

    body.id = noteArray[0];
    noteArray[0]++;

    noteArray.push(NewNote);
    fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify(noteArray, null, 2)
    );
};

app.post('/api/notes', (req, res) => {
    const NewNote = createNote(req.body, Notes);
    res.json(NewNote);
});

//function to delete new note
function deleteNote(id, noteArray) {
    for (let i = 0; i < noteArray.length; i++) {
        let note = noteArray[i];
        if (notStrictEqual.id == id) {
            noteArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(noteArray, null, 2)
            );
            break;
        };
    };
};

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, Notes);
    res.json(true);
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT} port!`);
});