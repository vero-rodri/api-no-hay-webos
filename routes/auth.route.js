const express = require('express');
const router = express.Router();
const usersController = require('../controllers/auth.controller');
const secure = require('../middlewares/secure.mid');
const parser = require('../configs/storage.config');

router.post('/register', parser.single('fileProfile'), usersController.register);
router.post('/authenticate', usersController.authenticate); 
router.get('/user/:userId', secure.isAuthenticated, usersController.detail);
router.get('/logout', secure.isAuthenticated, usersController.logout);

module.exports = router;
