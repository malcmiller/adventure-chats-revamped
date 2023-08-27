const express = require("express");

const checkAuthorization = require("../middleware/checkAuthorization");

const categoryRoutes = require("./routes/categories");
const chatRoutes = require("./routes/chat");
const imageRoutes = require("./routes/images");
const postRoutes = require("./routes/posts");
const profileRoutes = require("./routes/profiles");
const userRoutes = require("./routes/user");
const visitRoutes = require("./routes/visits");

const router = express.Router();

router.use(categoryRoutes);
router.use(chatRoutes);
router.use(imageRoutes);
router.use(postRoutes);
router.use(profileRoutes);
router.use(checkAuthorization, userRoutes);
router.use(visitRoutes);

module.exports = router;
