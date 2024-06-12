const express = require("express");
const router = express.Router();
const DriverModel = require("../General/CompanyRoute");
const CounterModel = require("../../models/CounterModel");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

// GET all drivers
router.get("/", async (req, res) => {
  try {
    const drivers = await DriverModel.find();
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/", async (req, res) => {
  try {
    let driverCounter = await CounterModel.findOneAndUpdate(
      { _id: "driverId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    // Assign the incremented sequence value as the id of the new driver
    const newDriverData = {
      driver_id: driverCounter.sequence_value,
      driverName: req.body.driverName,
      address: req.body.address,
      phone: req.body.phone,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      licenseToDrive: req.body.licenseToDrive,
      licenseNumber: req.body.licenseNumber,
      licenseExpiryDate: req.body.licenseExpiryDate,
      licenseIssueDate: req.body.licenseIssueDate,
      licenseIssuePlace: req.body.licenseIssuePlace,
      experince:req.body.experince,
      document: req.body.document,
      created_on:req.body.created_on,
      modified_on: req.body.modified_on

    };
    // Find and increment the current driverId counter

    // Create a new Driver instance
    const newDriver = new DriverModel(newDriverData);

    // Save the new Driver
    const savedDriver = await newDriver.save();

    res.status(201).json(savedDriver);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a driver
// Update a driver
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Assuming driver_id is the field for the driver's ID
    let driver = await DriverModel.findOne({ driver_id: id });

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    // Update driver fields
    driver.driverName = req.body.driverName || driver.driverName;
    driver.address = req.body.address || driver.address;
    driver.phone = req.body.phone || driver.phone;

    driver.pan = req.body.pan || driver.pan;

    // Save the updated driver
    const updatedDriver = await driver.save();
    res.json(updatedDriver);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a driver
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Assuming driver_id is the field for the driver's ID
    const driver = await DriverModel.findOne({ driver_id: id });

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    // Remove the driver from the database
    await DriverModel.deleteOne({ driver_id: id });
    res.json({ message: "Driver deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete all drivers
router.delete("/", async (req, res) => {
  try {
    await DriverModel.deleteMany({});
    res.json({ message: "All drivers deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
