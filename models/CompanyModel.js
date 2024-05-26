const mongoose = require("mongoose");

// Define Maker schema
const companySchema = new mongoose.Schema({
  company_id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },

  pan: {
    type: String,
    required: true,
  },
  created_on: {
    type: String,
    default: function () {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      return `${year}-${month < 10 ? "0" : ""}${month}-${
        day < 10 ? "0" : ""
      }${day}`;
    },
  },
  modified_on: {
    type: String,
    default: function () {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      return `${year}-${month < 10 ? "0" : ""}${month}-${
        day < 10 ? "0" : ""
      }${day}`;
    },
  },
});

// Compile the schema into a model
const CompanyModel = mongoose.model("Companiies", companySchema);

module.exports = CompanyModel;
