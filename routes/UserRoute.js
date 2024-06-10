const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    let userCounter = await CounterModel.findOneAndUpdate(
      { _id: "userId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    // Assign the incremented sequence value as the id of the new user
    const newUserData = {
      user_id: userCounter.sequence_value,
      email: req.body.email,
      password: req.body.password,
    };
    // Find and increment the current CompanyId counter

    // Create a new User instance
    const newUser = new UserModel(newUserData);

    // Save the new User
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a user
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Assuming user_id is the field for the user's ID
    let user = await UserModel.findOne({ user_id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    user.name = req.body.name || user.name;
    user.address = req.body.address || user.address;
    user.phone = req.body.phone || user.phone;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;

    // Save the updated user
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Assuming user_id is the field for the user's ID
    const user = await UserModel.findOne({ user_id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the user from the database
    await UserModel.deleteOne({ user_id: id });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete all users
router.delete("/", async (req, res) => {
  try {
    await UserModel.deleteMany({});
    res.json({ message: "All users deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
