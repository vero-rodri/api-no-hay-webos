const express = require('express');
const router = express.Router();
const evidencesController = require('../controllers/evidences.controller')
const secure = require('../middlewares/secure.mid')


router.get('/:userChallengeId/evidences', secure.isAuthenticated, evidencesController.list)
// router.get('/:id', userChallengesController.detail)

module.exports = router;
