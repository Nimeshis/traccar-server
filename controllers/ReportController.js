//report controller
const fetchXlsx = require('../utils/ReportUtils.js');

exports.getReport = async (req, res) => {
  try {
    const data = await fetchXlsx();
    res.render('report', { data });
  } catch (error) {
    res.status(500).send('Error generating report');
  }
};

exports.getReplay = (req, res) => {
  // Process and return replay data
  res.send('Replay data');
};

exports.getTripSummary = (req, res) => {
  // Process and return trip summary data
  res.send('Trip summary data');
};

exports.getLogs = (req, res) => {
  // Process and return logs data
  res.send('Logs data');
};

exports.getStatistics = (req, res) => {
  // Process and return statistics data
  res.send('Statistics data');
};