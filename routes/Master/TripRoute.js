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
    let tripCounter = await CounterModel.findOneAndUpdate(
      { _id: 'tripId' },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

 

    const newTrip = new Trip({
      tripId: tripCounter.sequence_value,
      tripStartTime:req.body.tripStartTime,
      tripEndTime:req.body.tripEndTime,
      tripLocation:req.body.tripLocation,
     distance: req.body.distance,
      tripDuration:req.body.tripDuration,
      driver:req.body.driver,
      fuelConsumed:req.body.fuelConsumed,
      status:req.body.status,
      modifiedby:req.body.modifiedBy,
      note:req.body.note
    });

    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
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
