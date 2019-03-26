const express = require('express');
const router = express.Router();
const challengesController = require('../controllers/challenges.controller');
const secure = require('../middlewares/secure.mid');
const parser = require('../configs/storage.config');

router.get('/', secure.isAuthenticated, challengesController.list)
router.post('/', secure.isAuthenticated, parser.single('fileChallenge'), challengesController.create)
router.get('/:id', secure.isAuthenticated, challengesController.detail)
router.post('/:id', secure.isAuthenticated, challengesController.createUserChallenge)
router.delete('/:id', secure.isAuthenticated, challengesController.deleteUserChallenge)

module.exports = router;
