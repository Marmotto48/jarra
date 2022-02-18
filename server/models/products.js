const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const productSchema = new Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    desc: String,
    image: {
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
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: {
      createdAt: "productCreatedAt",
      updatedAt: "productUpdatedAt",
    },
  }
);
module.exports = mongoose.model("product", productSchema);
