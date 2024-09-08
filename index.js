const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = 8001;

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/api/file', (req, res) => {
  const filePath = path.join(__dirname, 'datasets', 'Results.csv');
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(err.status).end();
    }
  });
});

app.get('/api/metadata', (req, res) => {
  const filePath = path.join(__dirname, 'datasets', 'Results.csv');

  const metadata = {
    fileName: 'Results.csv',
    fileSize: fs.statSync(filePath).size,
    fileType: 'text/csv',
    createdAt: fs.statSync(filePath).birthTime,
    updatedAt: fs.statSync(filePath).mtime,
  };

  res.json(JSON.stringify(metadata));
});

app.listen(PORT, () => {
  console.log(`File server running on port ${PORT}`);
});
