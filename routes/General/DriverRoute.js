const express = require("express");
const router = express.Router();
const DriverModel = require("../../models/General/DriverModel");
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

    const newDriverData = {
      driver_id: driverCounter.sequence_value,
      driverName: req.body.driverName,
      address: req.body.address,
      phone: req.body.phone,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      licenseNumber: req.body.licenseNumber,
      created_on: req.body.created_on,
      modified_on: req.body.modified_on
    };

    const newDriver = new DriverModel(newDriverData);

    const savedDriver = await newDriver.save();
    res.status(201).json(savedDriver);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let driver = await DriverModel.findOne({ driver_id: id });

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    driver.driverName = req.body.driverName || driver.driverName;
    driver.address = req.body.address || driver.address;
    driver.phone = req.body.phone || driver.phone;
    driver.country = req.body.country || driver.country;
    driver.state = req.body.state || driver.state;
    driver.city = req.body.city || driver.city;
    driver.licenseNumber = req.body.licenseNumber || driver.licenseNumber;
    driver.modified_on = new Date();

    const updatedDriver = await driver.save();
    res.json(updatedDriver);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const driver = await DriverModel.findOne({ driver_id: id });

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    await DriverModel.deleteOne({ driver_id: id });
    res.json({ message: "Driver deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    await DriverModel.deleteMany({});
    res.json({ message: "All drivers deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
