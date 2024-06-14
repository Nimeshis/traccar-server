const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  uniqueId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  groupId: { type: Number },
  phone: { type: String },
  model: { type: String },
  contact: { type: String },
  category: { type: String },
  calendarId: { type: Number },
  expirationTime: { type: Date },
  disabled: { type: Boolean, default: false },
  attributes: { type: Map, of: String }, // Assuming attributes are key-value pairs
});

module.exports = mongoose.model('Device', deviceSchema);
