const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const User = require("../../models/user");
const Image = require("../../models/image");

module.exports = {
  uploadImage,
  deleteImage,
};

async function uploadImage(req, res) {
  try {
    req.files.forEach(async (file) => {
      await Image.create({
        name: file.originalname,
        url: file.location,
      });
    });

    res.json({ status: "success" });
  } catch (error) {
    // Handle the error here, you can send an error response or log it.
    console.error("Error occurred:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
}

async function deleteImage(req, res) {
  try {
    const s3Client = new S3Client();

    // get filePath from MongoDB
    const file = await Image.findById(req.params.id);

    if (file != null) {
      const deleteObjectParams = {
        Bucket: "adventur-chats",
        Key: file.url.replace(process.env.AWS_BASE_URL, ""),
      };

      await s3Client.send(new DeleteObjectCommand(deleteObjectParams));
      // delete entry in MongoDB
      await Image.deleteOne({ _id: req.params.id });
      res.json({ status: "Successfully deleted object: ${file.url}" });
    } else {
      res.status(500).json({ error: "File not found" });
    }
  } catch (error) {
    console.error("Error deleting object:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
}
