const router = require("express").Router();

const chatMessageCtrl = require("../controllers/chat");

// GET /api/chat
router.get("/chat", chatMessageCtrl.getAllChatMessages);

// POST /api/chat
router.post("/chat", chatMessageCtrl.addChatMessage);

module.exports = router;
