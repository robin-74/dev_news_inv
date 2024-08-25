const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route to generate overview using Gemini API
router.post('/generate-overview', async (req, res) => {
  const { content } = req.body;

  try {
    const response = await axios.post('https://gemini-api-url', {  // Replace with the correct Gemini API URL
      key: 'AIzaSyCQ-iP3I6llRC7vTvRqof-AwjdKAWH4dDo',
      content: content
    });

    const overview = response.data.overview;
    res.status(200).json({ overview });
  } catch (error) {
    console.error('Error generating overview:', error);
    res.status(500).json({ error: 'Failed to generate overview' });
  }
});

module.exports = router;
