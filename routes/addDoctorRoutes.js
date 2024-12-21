// routes/userRoutes.js
const express = require('express');
const addDoctorController = require('../controllers/addDoctorController');
const router = express.Router();

router.post('/addDoctor', addDoctorController.addDoctor);
router.post('/updateDoctor', addDoctorController.updateDoctor);

router.get('/getDoctors', addDoctorController.getDoctorsByClinic);

module.exports = router;