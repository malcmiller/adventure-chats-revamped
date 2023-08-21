const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3"); // CommonJS import

const deleteImage = async (objectKey) => {
  const s3Client = new S3Client();

  const deleteObjectParams = {
    Bucket: "adventur-chats",
    Key: objectKey,
  };

  try {
    await s3Client.send(new DeleteObjectCommand(deleteObjectParams));
    console.log(`Successfully deleted object: ${objectKey}`);
  } catch (error) {
    console.error("Error deleting object:", error);
  }
};

module.exports = { deleteImage };
