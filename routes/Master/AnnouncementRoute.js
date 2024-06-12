const express = require("express");
const router = express.Router();
const AnnouncementModel = require('../../models/Master/AnnouncementModel');
const CounterModel = require("../../models/CounterModel");
const bodyParser = require("body-parser");

router.use(bodyParser.json());+

// GET all announcements
router.get("/", async (req, res) => {
  try {
    const announcements = await AnnouncementModel.find();
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/", async (req, res) => {
  try {
    let announcementCounter = await CounterModel.findOneAndUpdate(
      { _id: "announcementId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    // Assign the incremented sequence value as the id of the new announcement
    const newAnnouncementData = {
     
    };
    // Find and increment the current announcementId counter

    // Create a new Announcement instance
    const newAnnouncement = new AnnouncementModel(newAnnouncementData);

    // Save the new Announcement
    const savedAnnouncement = await newAnnouncement.save();

    res.status(201).json(savedAnnouncement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a announcement
// Update a announcement
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Assuming company_id is the field for the announcement's ID
    let announcement = await AnnouncementModel.findOne({ company_id: id });

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    // Update announcement fields
    announcement.name = req.body.name || announcement.name;
    announcement.address = req.body.address || announcement.address;
    announcement.phone = req.body.phone || announcement.phone;

    announcement.pan = req.body.pan || announcement.pan;

    // Save the updated announcement
    const updatedAnnouncement = await announcement.save();
    res.json(updatedAnnouncement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a announcement
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Assuming company_id is the field for the announcement's ID
    const announcement = await AnnouncementModel.findOne({ company_id: id });

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    // Remove the announcement from the database
    await AnnouncementModel.deleteOne({ company_id: id });
    res.json({ message: "Announcement deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete all announcements
router.delete("/", async (req, res) => {
  try {
    await AnnouncementModel.deleteMany({});
    res.json({ message: "All announcements deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
