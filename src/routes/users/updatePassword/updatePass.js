/*
 * @author aloki
 * @file updatePass.js
 * @date 2026-08-14
 */

const express = require('express');
const router = express.Router();
const verifyToken = require('../../../middleware/authMiddleware');
const { updatePasswordController } = require('../../../controllers/updatePasswordController');

router.post('/updatePassword', verifyToken, updatePasswordController);

module.exports = router;