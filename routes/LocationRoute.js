const express = require('express');
const router = express.Router();
const Location = require('../models/LocationModel');

// Route to save or update the location for a device
router.post('/', async (req, res) => {
  const { deviceId, coordinates, distance, latitude, longitude, timestamp, batteryLevel, speed } = req.body;

  let locations = [];

  if (deviceId && Array.isArray(coordinates)) {
    // Transform the array of arrays into an array of objects
    locations = coordinates.map(coord => ({
      latitude: coord[0],
      longitude: coord[1],
      timestamp: new Date(),
      batteryLevel: null, // Replace with actual battery level if available
      distance: distance || 0, // Use the provided distance if available
      speed: speed
    }));
  } else if (deviceId && latitude && longitude && distance !== undefined) {
    // Handle single location data format
    locations.push({
      latitude: latitude,
      longitude: longitude,
      timestamp: timestamp || new Date(),
      distance: distance,
      batteryLevel: batteryLevel || null,
      speed: speed
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

// Route to get location history for a specific device within a certain time frame
router.get('/history/:deviceId/:startTime/:endTime', async (req, res) => {
  try {
    const { deviceId, startTime, endTime } = req.params;
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const location = await Location.findOne({
      deviceId: deviceId,
      'history.timestamp': { $gte: startDate, $lte: endDate }
    }, {
      deviceId: 1,
      history: {
        $elemMatch: { timestamp: { $gte: startDate, $lte: endDate } }
      }
    });

    if (!location) {
      return res.status(404).send('No location history found for this device within the specified time frame.');
    }

    res.json(location);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
