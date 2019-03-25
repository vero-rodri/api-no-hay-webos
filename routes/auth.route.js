const express = require('express');
const router = express.Router();
const usersController = require('../controllers/auth.controller')

router.post('register', usersController.register)
router.post('/login', usersController.authenticate); 

module.exports = router;
