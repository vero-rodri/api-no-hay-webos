const express = require('express');
const router = express.Router();
const userChallengesController = require('../controllers/userChallenges.controller')

router.get('/', userChallengesController.list)
router.post('/:id', userChallengesController.createEvidence)
router.get('/:id', userChallengesController.detail)

module.exports = router;
