const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  object: { type: String, required: true },
  objectGroups: { type: String },
  alertType: { type: String, required: true },
  severity: { type: String, required: true },
  text: { type: String, required: true },
  validDays: { type: [String] },
});

const Alert = mongoose.model("Alert", alertSchema);

module.exports = Alert;
