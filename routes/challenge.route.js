const express = require('express');
const router = express.Router();
const challengesController = require('../controllers/challenges.controller');
const secure = require('../middlewares/secure.mid');
const parser = require('../configs/storage.config');

router.get('/', secure.isAuthenticated, challengesController.list)
router.post('/', secure.isAuthenticated, parser.single('fileChallenge'), challengesController.create)
router.get('/:id', secure.isAuthenticated, challengesController.detail)
router.post('/:id/likes', secure.isAuthenticated, challengesController.addToLikes)
router.delete('/:id/likes', secure.isAuthenticated, challengesController.removeFromLikes)
router.post('/:id/views', secure.isAuthenticated, challengesController.addToViews)

module.exports = router;
