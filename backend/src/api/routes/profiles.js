const router = require("express").Router();

const profilesCtrl = require("../controllers/profiles");

router.get("/", profilesCtrl.index);
router.get("/:id", profilesCtrl.show);
router.put("/:id", profilesCtrl.update);

module.exports = router;
