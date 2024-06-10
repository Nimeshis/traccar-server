const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  history: [{
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now
    },
    batteryLevel: {
      type: Number,
      required: true
    }
  }]
});

module.exports = mongoose.model('Location', locationSchema);
