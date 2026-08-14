const express = require('express');
const router = express.Router();
const verifyToken = require('../../../middleware/authMiddleware');
const { sendMessageController } = require('../../../controllers/messageController');

router.post("/sendmessage", verifyToken, sendMessageController);

module.exports = router;