const express = require('express');
// const labTestController = require('../controllers/labtestController');
const { labTest, getLabTest } = require('../controllers/labtestController');
const router = express.Router();


router.post('/labtest', labTest);

router.get('/getlabtest', getLabTest);


module.exports = router;
