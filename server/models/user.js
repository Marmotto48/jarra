const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    accountType: {
      type: String,
      enum: ["seller", "buyer", "admin"],
      default: "buyer",
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: Boolean,
      default: false,
    },
    bio: String,
    avatar: {
      imageURL: {
        type: String,
        default:
          "https://res.cloudinary.com/dfkgs6zsr/image/upload/v1636376320/Profile_avatar_placeholder_large_u3gfrg.png",
      },
      public_id: {
        type: String,
        default: "sample_id",
      },
    },
    followers: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: "userCreatedAt",
      updatedAt: "userUpdatedAt",
    },
  }
);
module.exports = mongoose.model("user", userSchema);
