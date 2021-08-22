const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();


const notes = require('./db/db');

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`); 
});
