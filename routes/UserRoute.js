const express = require("express");
const axios = require("axios");
const UserModel = require("../models/UserModel");
const CounterModel = require("../models/CounterModel");
const bodyParser = require("body-parser");

const router = express.Router();

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

// Create a new user
router.post("/", async (req, res) => {
  try {
    let userCounter = await CounterModel.findOneAndUpdate(
      { _id: "userId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    // Assign the incremented sequence value as the id of the new user
    const newUserData = {
      ...req.body,
      id: userCounter.sequence_value,
    };

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
    let user = await UserModel.findOne({ id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    Object.keys(req.body).forEach(key => {
      user[key] = req.body[key] !== undefined ? req.body[key] : user[key];
    });

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
    const user = await UserModel.findOne({ id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the user from the database
    await UserModel.deleteOne({ id: id });
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

// Forward data to external and local URLs
router.post("/forward-data", async (req, res) => {
  try {
    // Step 1: Make a POST request to the first URL
    const postUrl = 'http://108.181.195.185:8082/api/users';
    const postData = req.body; // Assuming the incoming data is in the request body

    const postResponse = await axios.post(postUrl, postData);

    // Check if the request was successful
    if (postResponse.status === 200) {
      const responseData = postResponse.data;

      // Step 2: Make a POST request to the second URL with the saved response
      const getUrl = 'http://localhost:3002/users';
      const secondPostResponse = await axios.post(getUrl, responseData);

      // Check if the request was successful
      if (secondPostResponse.status === 200) {
        res.status(200).send('Data successfully saved to the second URL.');
      } else {
        res.status(secondPostResponse.status).send('Failed to save data to the second URL.');
      }
    } else {
      res.status(postResponse.status).send('Failed to retrieve data from the first URL.');
    }
  } catch (error) {
    res.status(500).send('An error occurred: ' + error.message);
  }
});

module.exports = router;