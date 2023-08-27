const router = require("express").Router();

const chatMessageCtrl = require("../controllers/chat");

// GET /api/chat
router.get("/", chatMessageCtrl.getAllChatMessages);

// POST /api/chat
router.post("/", chatMessageCtrl.addChatMessage);

module.exports = router;
