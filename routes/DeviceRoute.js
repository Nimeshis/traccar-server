const express = require('express');
const Device = require('../models/DeviceModel');
const router = express.Router();

// Create a new device
router.post('/', async (req, res) => {
  try {
    const newDevice = new Device(req.body);
    const savedDevice = await newDevice.save();
    res.status(201).json(savedDevice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all devices
router.get('/', async (req, res) => {
  try {
    const devices = await Device.find();
    res.status(200).json(devices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a device by ID
router.get('/:id', async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) return res.status(404).json({ message: 'Device not found' });
    res.status(200).json(device);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a device
router.put('/:id', async (req, res) => {
  try {
    const updatedDevice = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDevice) return res.status(404).json({ message: 'Device not found' });
    res.status(200).json(updatedDevice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a device
router.delete('/:id', async (req, res) => {
  try {
    const deletedDevice = await Device.findByIdAndDelete(req.params.id);
    if (!deletedDevice) return res.status(404).json({ message: 'Device not found' });
    res.status(200).json({ message: 'Device deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
