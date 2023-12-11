const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes
router.get('/users/:id', userController.getUser);

module.exports = router;