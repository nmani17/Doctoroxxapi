
const express = require('express');
const addComplaintsController = require('../controllers/addcomplaintController');
const router = express.Router();

router.post('/addcomplaints', addComplaintsController.addcomplaints);

router.get('/get_add_complaints', addComplaintsController.get_add_complaints);

router.post('/update_complaints', addComplaintsController.update_complaints);
module.exports = router;