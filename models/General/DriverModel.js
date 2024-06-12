const mongoose = require("mongoose");

// Define Maker schema
const driverSchema = new mongoose.Schema({
  driver_id: {
    type: Number,
    unique: true,
  },
  driverName: {
    type: String,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  phone: {
    type: String,
    // required: true,
  },
  country: {
    type: String,
    // required: true,
  },
  state: {
    type: String,
    // required: true,
  },
  city: {
    type: String,
    // required: true,
  },
  licenseNumber: {
    type: String,
    // required: true,
  },
  created_on: {
    type: String,
    default: function () {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      return `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;
    },
  },
  modified_on: {
    type: String,
    default: function () {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      return `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;
    },
  },
});

// Compile the schema into a model
const DriverModel = mongoose.model("Driver", driverSchema);

module.exports = DriverModel;
