const router = require("express").Router();

const postsCtrl = require("../controllers/posts");

router.post("/", postsCtrl.createPost);

router.get("/", postsCtrl.index);

router.get("/:id", postsCtrl.showPost);

router.delete("/:id", postsCtrl.deletePost);

module.exports = router;
