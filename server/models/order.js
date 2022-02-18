const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        product: {
          type: mongoose.Types.ObjectId,
          ref: "product",
          required: true,
        },
      },
    ],
    orderName: {
      type: String,
      required: true,
    },
    shippingAdress: {
      address: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
      paymentMethod: {
        type: String,
        required: true,
      },
      paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
      },
      taxPrice: {
        type: Number,
        required: true,
        default: 0.0,
      },
      shippingprice: {
        type: Number,
        required: true,
        default: 0.0,
      },
      totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
      },
      isPaid: {
        type: Boolean,
        required: true,
        default: false,
      },
      paidAt: {
        type: Date,
      },
      isDelivered: {
        type: Boolean,
        required: true,
        default: false,
      },
      deliveredAt: {
        type: Date,
      },
    },
  },
  {
    timestamps: {
      createdAt: "orderCreatedAt",
      updatedAt: "orderUpdatedAt",
    },
  }
);
module.exports = mongoose.model("order", orderSchema);
