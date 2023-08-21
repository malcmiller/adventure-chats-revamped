const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Chat", chatSchema);
