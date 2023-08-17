const fs = require('fs');
const path = require('path');

exports.handler = async function(event) {
  const { imageUrl } = JSON.parse(event.body);

  const imageDataPath = path.resolve('.netlify/functions/imageData.json');

  try {
    const imageData = fs.existsSync(imageDataPath)
      ? JSON.parse(fs.readFileSync(imageDataPath))
      : [];
    
    imageData.push({ imageUrl });
    fs.writeFileSync(imageDataPath, JSON.stringify(imageData, null, 2));

    return {
      statusCode: 200,
      body: '(っ◕‿◕)っ♡ Image posted with love~ ♡'
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      body: 'An error occurred while posting the image.'
    };
  }
};
      
