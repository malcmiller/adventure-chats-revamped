const express = require("express");
const router = express.Router();
const visitsCtrl = require("../../controllers/api/visits");

// GET /api/visits
router.get("/", visitsCtrl.index);

// POST /api/visits
router.post("/", visitsCtrl.create);

// GET /api/visits/:id
router.get("/:id", visitsCtrl.show);

// PUT /api/visits/:id
router.put("/:id", visitsCtrl.update);

// DELETE /api/visits/:id
router.delete("/:id", visitsCtrl.delete);

module.exports = router;
