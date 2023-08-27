const express = require("express");

const postsCtrl = require("../controllers/posts");

const router = express.Router();

router.post("/", postsCtrl.createPost);

router.get("/", postsCtrl.index);

router.get("/:id", postsCtrl.showPost);

router.delete("/:id", postsCtrl.deletePost);

module.exports = router;
