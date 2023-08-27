const router = require("express").Router();

const profilesCtrl = require("../controllers/profiles");

router.get("/profile", profilesCtrl.index);
router.get("/profile/:id", profilesCtrl.show);
router.put("/profile/:id", profilesCtrl.update);

module.exports = router;
