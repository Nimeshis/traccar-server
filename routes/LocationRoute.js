const express = require('express');
const router = express.Router();
const Location = require('../models/LocationModel');

// Route to save or update the location for a device
router.post('/', async (req, res) => {
  const { deviceId, coordinates, distance, latitude, longitude, timestamp, batteryLevel } = req.body;

  let locations = [];

  if (deviceId && Array.isArray(coordinates)) {
    // Transform the array of arrays into an array of objects
    locations = coordinates.map(coord => ({
      latitude: coord[0],
      longitude: coord[1],
      timestamp: new Date(),
      batteryLevel: null, // Replace with actual battery level if available
      distance: distance || 0 // Use the provided distance if available
    }));
  } else if (deviceId && latitude && longitude && distance !== undefined) {
    // Handle single location data format
    locations.push({
      latitude: latitude,
      longitude: longitude,
      timestamp: timestamp || new Date(),
      distance: distance,
      batteryLevel: batteryLevel || null
    });
  } else {
    return res.status(400).send('Invalid input data');
  }

  try {
    let location = await Location.findOne({ deviceId });

    if (!location) {
      // If no location document exists for the device, create a new one
      location = new Location({
        deviceId,
        totalDistance: 0,
        history: []
      });
    }

    locations.forEach(loc => {
      location.history.push(loc);
      location.totalDistance += loc.distance;
    });

    const savedLocation = await location.save();
    res.status(201).send(savedLocation);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to get the latest location for all devices
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find().sort({ 'history.timestamp': -1 });
    res.send(locations);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to get the latest location for a specific device
router.get('/:deviceId', async (req, res) => {
  const { deviceId } = req.params;
  try {
    const location = await Location.findOne({ deviceId }).sort({ 'history.timestamp': -1 });
    res.send(location);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
