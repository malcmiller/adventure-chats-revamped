const router = require("express").Router();

const usersCtrl = require("../controllers/user");

// All paths start with '/api/users'

// POST /api/users (create a user - sign up)
router.post("/user", usersCtrl.createUser);
// POST /api/users/login
router.post("/user/login", usersCtrl.login);

module.exports = router;
