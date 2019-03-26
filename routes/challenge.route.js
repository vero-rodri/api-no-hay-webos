const express = require('express');
const router = express.Router();
const challengesController = require('../controllers/challenges.controller')

router.get('/', challengesController.list)
router.post('/', challengesController.create)
router.get('/:id', challengesController.detail)
router.post('/:id', challengesController.createUserChallenge)
router.delete('/:id', challengesController.deleteUserChallenge)

module.exports = router;
