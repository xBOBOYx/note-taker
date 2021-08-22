const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();


const notes = require('./db/db');

function generateNewNote(body, noteArray) {
    const genNote = body;
    noteArray.push(genNote);
    fs.writeFileSync(
        path.join(__dirname, 'db/db.json'),
        JSON.stringify({notes: noteArray}, null, 2)
    );
    return noteArray;
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const genNote = generateNewNote(req.body, notes);
    res.json(genNote);

});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`); 
});
