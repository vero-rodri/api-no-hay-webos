const express = require('express');
const router = express.Router();
const userChallengesController = require('../controllers/userChallenges.controller');
const secure = require('../middlewares/secure.mid');
const parser = require('../configs/storage.config');

router.get('/', secure.isAuthenticated, userChallengesController.list);
router.post('/:id/likes', secure.isAuthenticated, userChallengesController.addToLikes);
router.delete('/:id/likes', secure.isAuthenticated, userChallengesController.removeFromLikes);
router.post('/:id/views', secure.isAuthenticated, userChallengesController.addToViews);
// router.post('/:challengeId/user-challenges/', secure.isAuthenticated, userChallengesController.create)
// router.get('/:challengeId/user-challenges/:id', secure.isAuthenticated, userChallengesController.detail);
// router.delete('/:challengeId/user-challenges/:id', secure.isAuthenticated, secure.canDelete, userChallengesController.delete)



//router.post('/:id', secure.isAuthenticated, secure.isOwner, parser.single('fileEvidence'), userChallengesController.createEvidence);
module.exports = router;
