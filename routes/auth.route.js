const express = require('express');
const router = express.Router();
const usersController = require('../controllers/auth.controller');
const secure = require('../middlewares/secure.mid')

router.post('/register', usersController.register)
router.post('/authenticate', usersController.authenticate); 
router.get('/logout', secure.isAuthenticated, usersController.logout);

module.exports = router;
