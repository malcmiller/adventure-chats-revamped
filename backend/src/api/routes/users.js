const router = require("express").Router();

const usersCtrl = require("../controllers/users");

// All paths start with '/api/users'

// POST /api/users (create a user - sign up)
router.post("/", usersCtrl.create);
// POST /api/users/login
router.post("/login", usersCtrl.login);
// GET /api/users/check-token
router.get("/check-token", usersCtrl.checkToken);

module.exports = router;
