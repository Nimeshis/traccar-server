const express = require("express");
const router = express.Router();
const Alert = require("../../models/General/AlertModel");

// Get all alerts
router.get("/settings/alert", async (req, res) => {
    try {
      const alerts = await Alert.find();
      res.status(200).json(alerts);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


router.post("/settings/alert", async (req, res) => {
    try {
        const {
            name,
            address,
            phone,
            object,
            objectGroups,
            alertType,
            text,
            severity,
            validDays
        } = req.body;

        // Validation
        if (!name || !address || !object || !alertType || !text || !severity) {
            return res.status(400).json({ error: "Please fill in all required fields" });
        }

        const newAlert = new AlertModel({
            name,
            address,
            phone,
            object,
            objectGroups,
            alertType,
            text,
            severity,
            validDays
        });

        await newAlert.save();

        res.status(201).json({ message: "Alert added successfully", newAlert });
    } catch (error) {
        console.error("Error adding alert:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
