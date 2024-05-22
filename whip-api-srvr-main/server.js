const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const imagesFolder = path.join(__dirname, 'images');

const directoryToExpose = path.join(__dirname, 'images');
app.use(express.static(directoryToExpose));


// Middleware to handle CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow the following HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow the following headers
  next();
});

app.get('/api/getImages', (req, res) => {
  fs.readdir(imagesFolder, (err, files) => {
    if (err) {
      console.error('Error reading images folder:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const imageFiles = files.filter(file => file.endsWith('.jpg'));
    const imageData = imageFiles.map(file => ({
      name: file,
	url: `http://${req.headers.host}/images/${file}`
//      url: `${imagesFolder}/${file}`
    }));
    res.json(imageData);
  });
});

app.use(express.static(__dirname));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

