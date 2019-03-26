const express = require('express');
const router = express.Router();
const evidencesController = require('../controllers/evidences.controller')

router.get('/:userChallengeId/evidences', evidencesController.list)
// //router.p('/:id', userChallengesController.update)
// router.get('/:id', userChallengesController.detail)

module.exports = router;
