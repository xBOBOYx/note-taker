const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

const notes = require('./db/db');

function generateNewNote(body, noteArray) {
    const genNote = body;
    if (!Array.isArray(noteArray)) 
        noteArray = [];

    if (noteArray.length > 0) 
        noteArray.push(0);
        
        
    body.id = noteArray.length[0];
    noteArray[0]++;
    noteArray.push(genNote);
    
    fs.writeFileSync(
        path.join(__dirname, 'db/db.json'),
        JSON.stringify({notes: noteArray}, null, 2)
    );
    return noteArray;
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
  res.json(notes);
  res.json(notes.slice(1));
});

app.post('/api/notes', (req, res) => {
    const genNote = generateNewNote(req.body, notes);
    res.json(genNote);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`); 
});
