const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  deviceId: Number,
  groupId: Number,
  rawData: mongoose.Schema.Types.Mixed,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Report', reportSchema);
