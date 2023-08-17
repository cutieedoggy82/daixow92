const fs = require('fs');
const path = require('path');

exports.handler = async function() {
  const imageDataPath = path.resolve('/.netlify/functions/imageData.json');

  try {
    const imageData = fs.existsSync(imageDataPath)
      ? JSON.parse(fs.readFileSync(imageDataPath))
      : [];
    
    return {
      statusCode: 200,
      body: JSON.stringify(imageData)
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      body: 'An error occurred while fetching images.'
    };
  }
};
      
