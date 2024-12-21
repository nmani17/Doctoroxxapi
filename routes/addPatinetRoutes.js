// routes/userRoutes.js
const express = require('express');
const addPatientController = require('../controllers/addPatientController');
const router = express.Router();

router.post('/addPatientOrVisit', addPatientController.addPatientOrVisit);
router.get('/GetPatientsByClinic', addPatientController.getPatientsByClinicId);
router.get('/GetPatient', addPatientController.getPatientsByMobile); // For History // parms : mobile'
router.get('/GetPatientHistory', addPatientController.getPatientHistory); // For History // parms : mobile'


module.exports = router;
