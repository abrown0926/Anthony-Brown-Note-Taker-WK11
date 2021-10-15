const express = require('express');
const path = require('path');
const notes = require('./routes/notes.js');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uses notes.js file to handle endpoints starting with /notes
app.use('/api', notes);

app.get('/notes', (req, res) =>
  res.sendFile("notes.html", {
    root: __dirname + "/public"
  })
);

// GET Route for homepage 
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
