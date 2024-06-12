const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
    unique: true
  },
  totalDistance: {
    type: Number,
    default: 0
  },
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
      default: Date.now
    },
    batteryLevel: {
      type: Number,
      default: null
    },
    distance: {
      type: Number,
      default: 0
    },
  speed:{
    type: Number,
    
  }
  }]
});

module.exports = mongoose.model('Location', locationSchema);
