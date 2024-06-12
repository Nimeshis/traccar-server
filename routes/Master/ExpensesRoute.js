const express = require('express');
const router = express.Router();
const Expences = require('../../models/Master/ExpencesModel');
const CounterModel = require('../../models/CounterModel'); // Assuming you have a counter model for generating unique IDs
const bodyParser = require('body-parser');

router.use(bodyParser.json());

// GET all expences
router.get('/', async (req, res) => {
  try {
    const expences = await Expences.find();
    res.json(expences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single expence by ID
router.get('/:id', async (req, res) => {
  try {
    const expence = await Expences.findOne({ expenceId: req.params.id });
    if (!expence) {
      return res.status(404).json({ message: 'Expence not found' });
    }
    res.json(expence);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new expence
router.post('/', async (req, res) => {
  try {
    let expenceCounter = await CounterModel.findOneAndUpdate(
      { _id: 'expenceId' },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    const newExpenceData = {
      expenceId: expenceCounter.sequence_value,
      vehicle: req.body.vehicle,
      category: req.body.category,
      expenceType: req.body.expenceType,
      expenceFrom: req.body.expenceFrom,
      expenceTo: req.body.expenceTo,
      expenceDate: req.body.expenceDate,
      expenceAmount: req.body.expenceAmount,
      expenceDescription: req.body.expenceDescription,
      refrenceNumber: req.body.refrenceNumber,
      billAttached: req.body.billAttached
    };

    const newExpence = new Expences(newExpenceData);
    const savedExpence = await newExpence.save();
    res.status(201).json(savedExpence);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE an expence by ID
router.put('/:id', async (req, res) => {
  try {
    let expence = await Expences.findOne({ expenceId: req.params.id });
    if (!expence) {
      return res.status(404).json({ message: 'Expence not found' });
    }

    expence.vehicle = req.body.vehicle || expence.vehicle;
    expence.category = req.body.category || expence.category;
    expence.expenceType = req.body.expenceType || expence.expenceType;
    expence.expenceFrom = req.body.expenceFrom || expence.expenceFrom;
    expence.expenceTo = req.body.expenceTo || expence.expenceTo;
    expence.expenceDate = req.body.expenceDate || expence.expenceDate;
    expence.expenceAmount = req.body.expenceAmount || expence.expenceAmount;
    expence.expenceDescription = req.body.expenceDescription || expence.expenceDescription;
    expence.refrenceNumber = req.body.refrenceNumber || expence.refrenceNumber;
    expence.billAttached = req.body.billAttached || expence.billAttached;

    const updatedExpence = await expence.save();
    res.json(updatedExpence);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an expence by ID
router.delete('/:id', async (req, res) => {
  try {
    const expence = await Expences.findOne({ expenceId: req.params.id });
    if (!expence) {
      return res.status(404).json({ message: 'Expence not found' });
    }

    await Expences.deleteOne({ expenceId: req.params.id });
    res.json({ message: 'Expence deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE all expences
router.delete('/', async (req, res) => {
  try {
    await Expences.deleteMany({});
    res.json({ message: 'All expences deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
