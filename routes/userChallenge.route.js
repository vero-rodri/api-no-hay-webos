const express = require('express');
const router = express.Router();
const userChallengesController = require('../controllers/userChallenges.controller');
const secure = require('../middlewares/secure.mid')

router.get('/', secure.isAuthenticated, userChallengesController.list)
router.post('/:id', userChallengesController.createEvidence)
router.get('/:id', userChallengesController.detail)

module.exports = router;
