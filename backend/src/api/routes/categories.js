const express = require("express");

const categoryCtrl = require("../controllers/categories");

const router = express.Router();

router.get("/", categoryCtrl.index);

router.get("/:id", categoryCtrl.show);

module.exports = router;
