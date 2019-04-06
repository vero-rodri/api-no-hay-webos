const express = require('express');
const router = express.Router();
const userChallengesByChallengeController = require('../controllers/userChallengesByChallenge.controller');
const secure = require('../middlewares/secure.mid');
const parser = require('../configs/storage.config');

router.get('/:challengeId/user-challenges/', secure.isAuthenticated, userChallengesByChallengeController.listByChallenge);
router.post('/:challengeId/user-challenges/', secure.isAuthenticated, userChallengesByChallengeController.create)
router.delete('/:challengeId/user-challenges/:id', secure.isAuthenticated, secure.canDelete, userChallengesByChallengeController.delete)

module.exports = router;
