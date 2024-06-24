const express = require('express');
const router = express.Router();
const Remainder = require('../../models/General/RemainderModel');

// GET all remainders
router.get('/settings/remainder', async (req, res) => {
  try {
    const remainders = await Remainder.find();
    res.json(remainders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// POST create a new remainder
router.post('/settings/remainder', async (req, res) => {
  const remainder = new Remainder({
    companyName: req.body.companyName,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    PAN: req.body.PAN,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city
  });

  try {
    const newRemainder = await remainder.save();
    res.status(201).json(newRemainder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH update one remainder
router.patch('/:id', getRemainder, async (req, res) => {
  if (req.body.companyName != null) {
    res.remainder.companyName = req.body.companyName;
  }
  if (req.body.address != null) {
    res.remainder.address = req.body.address;
  }
  if (req.body.phoneNumber != null) {
    res.remainder.phoneNumber = req.body.phoneNumber;
  }
  if (req.body.PAN != null) {
    res.remainder.PAN = req.body.PAN;
  }
  if (req.body.country != null) {
    res.remainder.country = req.body.country;
  }
  if (req.body.state != null) {
    res.remainder.state = req.body.state;
  }
  if (req.body.city != null) {
    res.remainder.city = req.body.city;
  }

  try {
    const updatedRemainder = await res.remainder.save();
    res.json(updatedRemainder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE one remainder
router.delete('/:id', getRemainder, async (req, res) => {
  try {
    await res.remainder.remove();
    res.json({ message: 'Deleted remainder' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get remainder by ID
async function getRemainder(req, res, next) {
  try {
    const remainder = await Remainder.findById(req.params.id);
    if (remainder == null) {
      return res.status(404).json({ message: 'Cannot find remainder' });
    }
    res.remainder = remainder;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
