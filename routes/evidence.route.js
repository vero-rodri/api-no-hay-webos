const express = require('express');
const router = express.Router();
const evidencesController = require('../controllers/evidences.controller');
const secure = require('../middlewares/secure.mid');
const parser = require('../configs/storage.config');


router.get('/:userChallengeId/evidences/', secure.isAuthenticated, evidencesController.list);
router.post('/:userChallengeId/evidences/', secure.isAuthenticated, secure.isOwner, parser.single('fileEvidence'), evidencesController.create);
router.delete('/:userChallengeId/evidences/:id', secure.isAuthenticated, secure.isOwner, evidencesController.delete);


module.exports = router;

