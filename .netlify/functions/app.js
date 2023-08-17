const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const imageDataPath = './imageData.json';

// Create a new image post
app.post('/post', (req, res) => {
  const newImage = req.body;

  // Save the new image to JSON file
  let imageData = [];
  if (fs.existsSync(imageDataPath)) {
    imageData = JSON.parse(fs.readFileSync(imageDataPath));
  }
  imageData.push(newImage);
  fs.writeFileSync(imageDataPath, JSON.stringify(imageData, null, 2));

  res.send('(っ◕‿◕)っ♡ Image posted with love~ ♡');
});

// Get all images
app.get('/images', (req, res) => {
  if (fs.existsSync(imageDataPath)) {
    const imageData = JSON.parse(fs.readFileSync(imageDataPath));
    res.json(imageData);
  } else {
    res.json([]);
  }
});

app.listen(port, () => {
  console.log(`Your kawaii social network is running on port ${port}! (｡♥‿♥｡)`);
});
