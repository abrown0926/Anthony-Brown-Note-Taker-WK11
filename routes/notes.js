const express = require('express').Router();
const { readAndAppend, readFromFile, writeToFile
} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

express.delete('/notes/:id', (req, res) => {
  let id = req.params.id
  
  readFromFile('./db/db.json').then((data) => {
    let newData = JSON.parse(data).filter(function(note) {return note.id !== id})
    
    writeToFile("./db/db.json", newData)
    const response = {
      status: 'success',
      body: newData,
    };

    res.json(response);
  });  
})

// GET Route for retrieving notes
express.get('/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) => {
    res.json(JSON.parse(data))
  })
}  
);

// POST Route for submitting notes
express.post('/notes', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});

module.exports = express;