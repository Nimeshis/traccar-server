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

// // POST a new company
// router.post('/', async (req, res) => {
//     try {
//         // Find and increment the current company ID counter
//         let counter = await CounterModel.findOneAndUpdate(
//             { _id: 'CompanyId' },
//             { $inc: { sequence_value: 1 } },
//             { new: true, upsert: true }
//         );

//         // Create a new company
//         const newCompany = new CompanyModel({
//             id: counter.sequence_value,
//             name: req.body.name,
//             address: req.body.address,
//             phone: req.body.phone,
//             pan: req.body.pan
//         });

//         // Save the new company
//         const savedCompany = await newCompany.save();
//         res.status(201).json(savedCompany);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// router.post('/', async (req, res) => {
//     try {
//       // Find and increment the current CompanyId counter
//       let CompanyCounter = await CounterModel.findOneAndUpdate(
//         { _id: 'CompanyId' },
//         { $inc: { sequence_value: 1 } },
//         { new: true, upsert: true }
//       );

//       // Create a new Company
//       const newCompanyData = {
//         id: CompanyCounter.sequence_value,
//         name: req.body.name,
//         address: req.body.address,
//         phone: req.body.phone,
//         pan: req.body.pan
//       };

//       // Create a new Company instance
//       const newCompany = new CompanyModel(newCompanyData);

//       // Save the new Company
//       const savedCompany = await newCompany.save();

//       // Excluding the _id field from the response
//       const CompanyWithoutId = await CompanyModel.findById(savedCompany._id).select('-_id');

//       res.status(201).json(CompanyWithoutId);

//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });

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
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let companies = await CompanyModel.findOne({ id: id });

    // If no unit is found with the given id, return a 404 error
    if (!companies) {
      return res.status(404).json({ message: "Unit not found" });
    }

    // Update companies fields with data from request body
    companies.name = req.body.name || companies.name;
    companies.address = req.body.address || companies.address;
    companies.phone = req.body.phone || companies.phone;
    companies.pan = req.body.pan || companies.pan;

    // Save the updated companies
    companies = await companies.save();

    // Return the updated companies
    res.json(companies);
  } catch (err) {
    // If an error occurs during the update, return a 400 error
    res.status(400).json({ message: err.message });
  }
});

// Delete a company
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the company by id
    const companies = await CompanyModel.findOne({ id: id });

    // If no company is found with the given id, return a 404 error
    if (!companies) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Remove the companies from the database
    await CompanyModel.deleteOne({ id: id });

    // Return a success message
    res.json({ message: "Company deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    await CompanyModel.deleteMany({});

    // Return a success message
    res.json({ message: "All companies deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
