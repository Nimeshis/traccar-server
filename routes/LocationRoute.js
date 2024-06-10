const express = require('express');
const router = express.Router();
const Location = require('../models/LocationModel');

// Route to save or update the location
router.post('/', async (req, res) => {
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const timestamp = req.body.timestamp || new Date();
  const batteryLevel = req.body.batteryLevel;

  try {
    let location = await Location.findOne();

    if (!location) {
      // If no location document exists, create a new one
      location = new Location({
        history: [{
          latitude,
          longitude,
          timestamp,
          batteryLevel
        }]
      });
    } else {
      // If a location document already exists, update it
      location.history.push({
        latitude,
        longitude,
        timestamp,
        batteryLevel
      });
    }

    const savedLocation = await location.save();
    res.status(201).send(savedLocation);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to get the latest location
router.get('/', async (req, res) => {
  try {
    const location = await Location.findOne().sort({ 'history.timestamp': -1 });
    res.send(location);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
