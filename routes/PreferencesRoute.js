// routes/PreferencesRoute.js
const express = require('express');
const router = express.Router();
const Preferences = require('../models/PreferencesModel'); // Correct the path here

// Create a new preference
router.post('/', async (req, res) => {
  try {
    const preference = new Preferences(req.body);
    const savedPreference = await preference.save();
    res.status(201).json(savedPreference);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all preferences
router.get('/', async (req, res) => {
  try {
    const preferences = await Preferences.find();
    res.json(preferences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
