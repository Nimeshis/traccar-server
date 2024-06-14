const express = require('express');
const router = express.Router();
const Trip = require('../../models/Master/ClassifyTripModel');
const CounterModel = require('../../models/CounterModel'); // Assuming you have a counter model for generating unique IDs
const bodyParser = require('body-parser');

router.use(bodyParser.json());
 
// GET all trips
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single trip by ID
router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findOne({ tripId: req.params.id });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new trip
router.post('/', async (req, res) => {
  try {
    let jobCounter = await CounterModel.findOneAndUpdate(
      { _id: 'tripId' },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    const newJobData = {
      tripId: jobCounter.sequence_value,
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

    const newTrip = new Trip(newJobData);
    const savedTrips = await newTrip.save();
    res.status(201).json(savedTrips);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE an trip by ID
router.put('/:id', async (req, res) => {
  try {
    let trip = await Trip.findOne({ tripId: req.params.id });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    trip.vehicle = req.body.vehicle || trip.vehicle;
    trip.category = req.body.category || trip.category;
    trip.expenceType = req.body.expenceType || trip.expenceType;
    trip.expenceFrom = req.body.expenceFrom || trip.expenceFrom;
    trip.expenceTo = req.body.expenceTo || trip.expenceTo;
    trip.expenceDate = req.body.expenceDate || trip.expenceDate;
    trip.expenceAmount = req.body.expenceAmount || trip.expenceAmount;
    trip.expenceDescription = req.body.expenceDescription || trip.expenceDescription;
    trip.refrenceNumber = req.body.refrenceNumber || trip.refrenceNumber;
    trip.billAttached = req.body.billAttached || trip.billAttached;

    const updatedTrips = await trip.save();
    res.json(updatedTrips);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an trip by ID
router.delete('/:id', async (req, res) => {
  try {
    const trip = await Trip.findOne({ tripId: req.params.id });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    await Trip.deleteOne({ tripId: req.params.id });
    res.json({ message: 'Trip deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE all trips
router.delete('/', async (req, res) => {
  try {
    await Trip.deleteMany({});
    res.json({ message: 'All trips deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
