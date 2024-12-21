const express = require('express');
const prescriptionController = require('../controllers/prescriptionController');
const router = express.Router();

router.post('/createPrescription', prescriptionController.createPrescription);
router.get('/searchPrescription', prescriptionController.searchPrescription);


module.exports = router;
