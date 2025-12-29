const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');

// POST /api/chat - Send message to AI
router.post('/', chatController.chat);

module.exports = router;
