const express = require('express');
const router = express.Router();
const verifyToken = require('../../../middleware/authMiddleware');
const { getConversationsController } = require('../../../controllers/conversationController');

router.get('/conversation', verifyToken, getConversationsController);

module.exports = router;