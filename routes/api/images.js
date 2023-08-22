const express = require("express");
const router = express.Router();
const imagesCtrl = require("../../controllers/api/images");
const ensureLoggedIn = require("../../config/ensureLoggedIn");
const { uploadImage } = require("../../config/uploadImage");

router.post(
  "/upload/:postId",
  // ensureLoggedIn,
  uploadImage.array("file"),
  imagesCtrl.uploadImage
);

router.delete("/:id", imagesCtrl.deleteImage);

module.exports = router;
