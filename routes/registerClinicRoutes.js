const express = require('express');
const registerClinicController = require('../controllers/registerClinicController');
const router = express.Router();

// Define routes and map them to controller functions
router.post('/registerClinic', registerClinicController.registerClinic);

module.exports = router;

//http://localhost:3000/api/clinic/registerClinic

