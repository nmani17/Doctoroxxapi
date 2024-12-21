const express = require('express');
const purposeofvisit = require('../controllers/M_purposeofvisitController');
const router = express.Router();

// Define routes and map them to controller functions
router.get('/getPurposeofvisit', purposeofvisit.getPurpose);

module.exports = router;