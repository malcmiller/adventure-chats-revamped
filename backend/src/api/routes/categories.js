const router = require("express").Router();

const categoryCtrl = require("../controllers/categories");

router.get("/", categoryCtrl.index);

router.get("/:id", categoryCtrl.show);

module.exports = router;
