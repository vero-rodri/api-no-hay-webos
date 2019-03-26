const express = require('express');
const router = express.Router();
const userChallengesController = require('../controllers/userChallenges.controller');
const secure = require('../middlewares/secure.mid')

router.get('/', secure.isAuthenticated, userChallengesController.list)
router.post('/:id', secure.isAuthenticated, userChallengesController.createEvidence)
router.get('/:id', secure.isAuthenticated, userChallengesController.detail)

module.exports = router;
