const router = require("express").Router();

const imagesCtrl = require("../controllers/images");
const { uploadImage } = require("../../util/uploadImage");

router.post(
  "/upload/:folder/:id",
  uploadImage.array("file"),
  imagesCtrl.uploadImage
);

router.delete("/:id", imagesCtrl.deleteImage);

module.exports = router;
