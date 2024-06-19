const express = require('express');
const axios = require('axios');
const Report = require('../models/TravelSummary');

const router = express.Router();

// Route to fetch data from external API and save it to MongoDB
router.get('/fetch', async (req, res) => {
  const { deviceId, groupId, from, to } = req.query;

  if (!deviceId || !groupId || !from || !to) {
    return res.status(400).json({ message: 'Missing required query parameters' });
  }

  try {
    // Connect to MongoDB
    
    const apiUrl = 'https://demo.traccar.org/api/reports/route'; // Replace with your Traccar server URL
    const params = {
        deviceId: '1', // Replace with your device ID
        from: '2024-06-10T00:00:00Z', // Replace with start date
        to: '2024-06-20T00:00:00Z' // Replace with end date
    };

    // Replace 'your_access_token' with your actual access token if required
    const headers = {
        Authorization: 'Basic ' + Buffer.from('suman.niraula00@gmail.com:suman@123').toString('base64')
    };

    // Make GET request to Traccar API
    const response = await axios.get(apiUrl, {
        params,
        headers
    })

    // Store response data in MongoDB
    const result = await collection.insertOne(response.data);
    console.log(`${result.insertedCount} document(s) inserted`);

} catch (error) {
    console.error('Error:', error.message);
} 

}),

// Fetch all reports from MongoDB
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching reports' });
  }
});

module.exports = router;
