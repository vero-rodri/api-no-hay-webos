const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const secure = require('../middlewares/secure.mid');


router.get('/:userId/user-challenges', secure.isAuthenticated, usersController.listUserChallengesByUser);
router.get('/:userId/challenges', secure.isAuthenticated, usersController.listChallengesByUser);


module.exports = router;