
const express = require('express');
const { vaccine, getvaccine } = require('../controllers/vaccineController');
const router = express.Router();

router.get('/getvaccine', getvaccine);
router.post('/vaccine', vaccine);

module.exports = router;
