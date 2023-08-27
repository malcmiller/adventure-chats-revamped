const express = require("express");

const imagesCtrl = require("../controllers/images");
const { uploadImage } = require("../../config/uploadImage");

const router = express.Router();

router.post(
  "/upload/:folder/:id",
  uploadImage.array("file"),
  imagesCtrl.uploadImage
);

router.delete("/:id", imagesCtrl.deleteImage);

module.exports = router;
