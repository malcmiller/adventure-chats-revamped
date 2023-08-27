const router = require("express").Router();

const visitsCtrl = require("../controllers/visits");

// GET /api/visits
router.get("/", visitsCtrl.index);

// POST /api/visits
router.post("/", visitsCtrl.createVisit);

// GET /api/visits/:id
router.get("/:id", visitsCtrl.showVisit);

// PUT /api/visits/:id
router.put("/:id", visitsCtrl.updateVisit);

// DELETE /api/visits/:id
router.delete("/:id", visitsCtrl.deleteVisit);

module.exports = router;
