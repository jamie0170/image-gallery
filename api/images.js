const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();
const PORT = 3000;

const resourceDir = path.join(__dirname, '..', 'resourse');

app.get('/api/images', (req, res) => {
  fs.readdir(resourceDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read image folder' });
    }

    const imageFiles = files
      .filter((file) => /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(file))
      .map((file) => `resourse/${file}`);

    res.json(imageFiles);
  });
});

app.use(express.static(path.join(__dirname, '..')));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
