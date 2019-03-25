const express = require('express');
const router = express.Router();
const challengesController = require('../controllers/challenges.controller')

router.get('/', challengesController.list)
router.post('/', challengesController.create)

module.exports = router;
