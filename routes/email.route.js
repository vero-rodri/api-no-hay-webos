const express = require('express');
const router = express.Router();
const emailsController = require('../controllers/emails.controller');
const secure = require('../middlewares/secure.mid');

router.post('/', secure.isAuthenticated, emailsController.sendEmails);

module.exports = router;