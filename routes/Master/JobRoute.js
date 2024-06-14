const express = require('express');
const router = express.Router();
const Job = require('../../models/Master/JobModel');
const CounterModel = require('../../models/CounterModel'); // Assuming you have a counter model for generating unique IDs
const bodyParser = require('body-parser');

router.use(bodyParser.json());

// GET all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findOne({ jobId: req.params.id });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new job
router.post('/', async (req, res) => {
  try {
    let jobCounter = await CounterModel.findOneAndUpdate(
      { _id: 'jobId' },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    const newJobData = {
      jobId: jobCounter.sequence_value,
      jobName: req.body.jobName,
      description: req.body.description,
      noOfCheckpoint: req.body.noOfCheckpoint,
      noOfSchedule: req.body.noOfSchedule,
      scheduleType: req.body.scheduleType,
      validFrom: req.body.validFrom,
      jobEndTime: req.body.jobEndTime,
      jobStatus: req.body.jobStatus,
      jobStartTime: req.body.jobStartTime,
      tripType: req.body.tripType,
      jobType: req.body.jobType,
      jobDate: req.body.jobDate,
      assign: req.body.assign,
      document: req.body.document,
      alert: req.body.alert
  };

    const newJob = new Job(newJobData);
    const savedJobs = await newJob.save();
    res.status(201).json(savedJobs);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE an job by ID
router.put('/:id', async (req, res) => {
  try {
    let job = await Job.findOne({ jobId: req.params.id });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    job.vehicle = req.body.vehicle || job.vehicle;
    job.category = req.body.category || job.category;
    job.expenceType = req.body.expenceType || job.expenceType;
    job.expenceFrom = req.body.expenceFrom || job.expenceFrom;
    job.expenceTo = req.body.expenceTo || job.expenceTo;
    job.expenceDate = req.body.expenceDate || job.expenceDate;
    job.expenceAmount = req.body.expenceAmount || job.expenceAmount;
    job.expenceDescription = req.body.expenceDescription || job.expenceDescription;
    job.refrenceNumber = req.body.refrenceNumber || job.refrenceNumber;
    job.billAttached = req.body.billAttached || job.billAttached;

    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an job by ID
router.delete('/:id', async (req, res) => {
  try {
    const job = await Job.findOne({ jobId: req.params.id });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    await Job.deleteOne({ jobId: req.params.id });
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE all jobs
router.delete('/', async (req, res) => {
  try {
    await Job.deleteMany({});
    res.json({ message: 'All jobs deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
