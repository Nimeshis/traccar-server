//report routes
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/ReportController');

router.get('/', reportController.getReport);
router.get('/replay', reportController.getReplay);
router.get('/trip-summary', reportController.getTripSummary);
router.get('/logs', reportController.getLogs);
router.get('/statistics', reportController.getStatistics);

module.exports = router;