const router = require("express").Router();

const postsCtrl = require("../controllers/posts");

router.post("/post", postsCtrl.createPost);

router.get("/post", postsCtrl.index);

router.get("/post/:id", postsCtrl.showPost);

router.delete("/post/:id", postsCtrl.deletePost);

module.exports = router;
