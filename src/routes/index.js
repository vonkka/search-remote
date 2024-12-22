const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Directory where the files are stored
const documentsDir = path.join('/home/vonka/web/', 'tests');

function readFilesFromDirectory(directory) {
  return fs.readdirSync(directory).map((file) => {
    const filePath = path.join(directory, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    return {
      name: file,
      content,
    };
  });
}

function searchFiles(query, files) {
  const queryWords = query.split(' ');
  
  return files.filter((file)=> {
         return queryWords.every((word)=>file.content.toLowerCase().includes(word));
        });
}

const files = readFilesFromDirectory(documentsDir);

router.get('/search', (req, res) => {
  const query = req.query.query.toLowerCase();

  const results = searchFiles(query, files);

  res.render('search', { results });
});

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


module.exports = router;
