const router = require("express").Router();

const visitsCtrl = require("../controllers/visits");

// GET /api/visits
router.get("/visit", visitsCtrl.index);

// POST /api/visits
router.post("/visit", visitsCtrl.createVisit);

// GET /api/visits/:id
router.get("/visit/:id", visitsCtrl.showVisit);

// PUT /api/visits/:id
router.put("/visit/:id", visitsCtrl.updateVisit);

// DELETE /api/visits/:id
router.delete("/visit/:id", visitsCtrl.deleteVisit);

module.exports = router;
