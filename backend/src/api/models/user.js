const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      pictureURLs: [
        {
          type: String,
        },
      ],
      homeBase: {
        googlePlaceId: String,
        placeName: String,
      },
      visits: [
        {
          type: Schema.Types.ObjectId,
          ref: "Visit",
        },
      ],
      posts: [
        {
          type: Schema.Types.ObjectId,
          ref: "Post",
        },
      ],
      followers: [
        {
          type: Schema.Types.ObjectId,
          ref: "Profile",
        },
      ],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  // 'this' is the user document
  if (!this.isModified("password")) return next();
  // Replace the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

module.exports = mongoose.model("User", userSchema);
