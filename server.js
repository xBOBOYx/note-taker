
// express module
const express = require('express');
const fs = require('fs');
const path = require('path');

// uses any port or 3001 if not specified
const PORT = process.env.PORT || 3001;

// express app
const app = express();

// request data
const pnotes = require('./db/db.json');

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

// routes
app.get('/api/notes', (req, res) => {
    res.json(pnotes.slice(1));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// post request
app.post('/api/notes', (req, res) => {
    const genNote = generateNewNote(req.body, pnotes);
    res.json(genNote);
});

//create new note and add id
function generateNewNote(body, noteArray) {
    const genNote = body;
    if (!Array.isArray(noteArray))
        noteArray = [];

    if (noteArray.length === 0)
        noteArray.push(0);


    body.id = noteArray[0];
    noteArray[0]++;
    noteArray.push(genNote);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(noteArray, null, 4)
    );
    return genNote;
}

// delete note by id
function removesNote(id, noteArray) {
    for (let i = 0; i < noteArray.length; i++) {
        let note = noteArray[i];

        if (note.id == id) {
            noteArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(noteArray, null, 4)
            );

            break;
        }
    }
}

// delete note by id
app.delete('/api/notes/:id', (req, res) => {
    removesNote(req.params.id, pnotes);
    res.json(true);
});

// start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});