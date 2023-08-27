const express = require("express");

const chatMessageCtrl = require("../controllers/chat");

const router = express.Router();

// GET /api/chat
router.get("/", chatMessageCtrl.getAllChatMessages);

// POST /api/chat
router.post("/", chatMessageCtrl.addChatMessage);

module.exports = router;
