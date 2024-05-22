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
  pan: {
    type: String,
    required: true,
  },
});

// Compile the schema into a model
const CompanyModel = mongoose.model("Companiies", companySchema);

module.exports = CompanyModel;
