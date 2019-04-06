const express = require('express');
const router = express.Router();
const usersController = require('../controllers/auth.controller');
const secure = require('../middlewares/secure.mid');
const parser = require('../configs/storage.config');

router.post('/register', parser.single('fileProfile'), usersController.register);
router.post('/authenticate', usersController.authenticate); 
router.get('/logout', secure.isAuthenticated, usersController.logout);
router.get('/session', secure.isAuthenticated, usersController.getSession);
router.get('/user/:userId', secure.isAuthenticated, usersController.detail);


module.exports = router;
