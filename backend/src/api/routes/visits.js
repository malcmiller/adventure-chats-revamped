const checkAuth = require("../../config/checkAuth");
const express = require("express");
const router = express.Router();
const visitsCtrl = require("../../controllers/api/visits");

// GET /api/visits
router.get("/", visitsCtrl.index);

// POST /api/visits
router.post("/", checkAuth, visitsCtrl.createVisit);

// GET /api/visits/:id
router.get("/:id", checkAuth, visitsCtrl.showVisit);

// PUT /api/visits/:id
router.put("/:id", checkAuth, visitsCtrl.updateVisit);

// DELETE /api/visits/:id
router.delete("/:id", checkAuth, visitsCtrl.deleteVisit);

module.exports = router;
