const express = require("express");

const categoryRoutes = require("./routes/categories");
const chatRoutes = require("./routes/chat");
const imageRoutes = require("./routes/images");
const postRoutes = require("./routes/posts");
const profileRoutes = require("./routes/profiles");
const userRoutes = require("./routes/users");
const visitRoutes = require("./routes/visits");

const router = express.Router();

router.use("/api/category", categoryRoutes);
router.use("/api/chat", chatRoutes);
router.use("/api/image", imageRoutes);
router.use("/api/post", postRoutes);
router.use("/api/profile", profileRoutes);
router.use("/api/user", userRoutes);
router.use("/api/visit", visitRoutes);

module.exports = router;
