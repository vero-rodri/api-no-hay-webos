const express = require('express');
const router = express.Router();
const usersController = require('../controllers/auth.controller')

router.post('/register', usersController.register)
router.post('/authenticate', usersController.authenticate); 
router.get('/logout', usersController.logout);

module.exports = router;
