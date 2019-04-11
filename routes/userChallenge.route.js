const express = require('express');
const router = express.Router();
const userChallengesController = require('../controllers/userChallenges.controller');
const secure = require('../middlewares/secure.mid');

router.get('/', secure.isAuthenticated, userChallengesController.listFinished);
router.get('/pending-by-session', secure.isAuthenticated, userChallengesController.listPendingBySession);
router.get('/:id', secure.isAuthenticated, userChallengesController.detail);
router.post('/create-notifications', secure.isAuthenticated, userChallengesController.createUserChallengesByNotifications);
router.post('/:id', secure.isAuthenticated, userChallengesController.update);
router.post('/:id/accept', secure.isAuthenticated, userChallengesController.accept);
router.delete('/:id', secure.isAuthenticated, userChallengesController.delete)
router.post('/:id/likes', secure.isAuthenticated, userChallengesController.addToLikes);
router.delete('/:id/likes', secure.isAuthenticated, userChallengesController.removeFromLikes);
router.post('/:id/views', secure.isAuthenticated, userChallengesController.addToViews);

module.exports = router;


