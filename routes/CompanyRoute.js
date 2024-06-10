const express = require("express");
const router = express.Router();
const CompanyModel = require("../models/CompanyModel");
const CounterModel = require("../models/CounterModel");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

// GET all companies
router.get("/", async (req, res) => {
  try {
    const companies = await CompanyModel.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/", async (req, res) => {
  try {
    let companyCounter = await CounterModel.findOneAndUpdate(
      { _id: "CompanyId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    // Assign the incremented sequence value as the id of the new company
    const newCompanyData = {
      company_id: companyCounter.sequence_value,
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      pan: req.body.pan,
    };
    // Find and increment the current CompanyId counter

    // Create a new Company instance
    const newCompany = new CompanyModel(newCompanyData);

    // Save the new Company
    const savedCompany = await newCompany.save();

    res.status(201).json(savedCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a company
// Update a company
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Assuming company_id is the field for the company's ID
    let company = await CompanyModel.findOne({ company_id: id });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Update company fields
    company.name = req.body.name || company.name;
    company.address = req.body.address || company.address;
    company.phone = req.body.phone || company.phone;

    company.pan = req.body.pan || company.pan;

    // Save the updated company
    const updatedCompany = await company.save();
    res.json(updatedCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a company
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Assuming company_id is the field for the company's ID
    const company = await CompanyModel.findOne({ company_id: id });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Remove the company from the database
    await CompanyModel.deleteOne({ company_id: id });
    res.json({ message: "Company deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete all companies
router.delete("/", async (req, res) => {
  try {
    await CompanyModel.deleteMany({});
    res.json({ message: "All companies deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
