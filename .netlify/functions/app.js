exports.handler = async (event, context) => {
  const express = require('express');
  const bodyParser = require('body-parser');
  const fs = require('fs');

  const app = express();
  app.use(bodyParser.json());

  const imageDataPath = './imageData.json';

  // Create a new image post
  app.post('/post', (req, res) => {
    const newImage = req.body.imageUrl;

    // Save the new image to JSON file
    let imageData = [];
    if (fs.existsSync(imageDataPath)) {
      imageData = JSON.parse(fs.readFileSync(imageDataPath));
    }
    imageData.push({ imageUrl: newImage });
    fs.writeFileSync(imageDataPath, JSON.stringify(imageData, null, 2));

    res.send('(っ◕‿◕)っ♡ Image posted with love~ ♡');
  });

  return new Promise((resolve, reject) => {
    app.listen(3000, () => {
      console.log(`Your kawaii social network is running on port 3000! (｡♥‿♥｡)`);
      resolve({
        statusCode: 200,
        body: 'Your kawaii social network is running on port 3000! (｡♥‿♥｡)'
      });
    });
  });
};
                    
