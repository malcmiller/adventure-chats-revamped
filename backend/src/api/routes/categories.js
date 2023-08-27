const router = require("express").Router();

const categoryCtrl = require("../controllers/categories");

router.get("category/", categoryCtrl.index);

router.get("category/:id", categoryCtrl.show);

module.exports = router;
