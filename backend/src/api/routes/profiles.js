const express = require("express");

const profilesCtrl = require("../controllers/profiles");

const router = express.Router();

router.get("/", profilesCtrl.index);
router.get("/:id", profilesCtrl.show);
router.put("/:id", profilesCtrl.update);

module.exports = router;
