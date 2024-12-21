// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/loginController');
const router = express.Router();

router.post('/login', userController.login);
router.post('/checkEmail', userController.checkEmail);

module.exports = router;
