//declaring dependancies
const express = require('express');
const fs = require('fs');
const path = require('path');
const Data = require('./db/db.json');

//Including variable for express and the ports used
var app = express();
var PORT = process.env.PORT || 3001;

//sets a port
app.listen(PORT, function (){
    console.log(`You are tuned to ${PORT}!`)
})

//getting assets and parsing for express thru json
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Starts off with html page when first opened and send to the notes page when promped
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '/piblic/notes.html'));
});

//This function gets a new ID from user input
app.route('/api/notes').get(function(req, res){
    res.json(Data);
}).post(function(req, res) {
    let jsonPath = path.join(__dirname, "/db/db.json");
    let NewNote = req.body;
    let MaxID = 100;
    //Finds a higest ID note and assings a new ID to a new Note
    for (let i = 0; i < Data.length; i++) {
        let EachNote = Data[i];
        if (EachNote.id > MaxID){
        MaxID = EachNote.id;
        }
    }
    NewNote.id = MaxID + 1;
    database.push(NewNote)
    fs.writeFile(jsonPath, JSON.stringify(Data), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("Note was succesfully saved!");
    });
});
//This deletes the note
app.delete('/api/notes/:id', function(req, res){
    let jsonPath = path.join(__dirname, '/db/db.json');
    for(let i = 0; i < Data.length; i++) {      //finding the ID of the note ID
        if(database[i].id == req.params.id){
            Data.splice(i, 1); //this should take node.id and 'splice' it away
            break;
        }
    }
    fs.writeFileSync(jsonPath, JSON.stringify(Data), function(err){
        if(err){
            return console.log(err);
        } else {
            console.log('Note has been deleted!');
        }
    });
    res.json(Data);
});