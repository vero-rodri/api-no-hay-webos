const express = require('express');
const router = express.Router();
const userChallengesController = require('../controllers/userChallenges.controller');
const secure = require('../middlewares/secure.mid');
const parser = require('../configs/storage.config');

router.get('/', secure.isAuthenticated, userChallengesController.list);
router.get('/:id', secure.isAuthenticated, userChallengesController.detail);

module.exports = router;
