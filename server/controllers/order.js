const { send } = require("express/lib/response");
const Order = require("../models/order");

module.exports = {
  create: async (req, res) => {
    try {
      const {
        orderItems,
        shippingAdress,
        // paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;
      if (req.userType !== "buyer") {
        if (orderItems && orderItems.length === 0) {
          res.status(400).send("No order items");
        } else {
          const newOrder = await Order.create({
            owner: req.userID,
            orderItems,
            shippingAdress,
            // paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
          });
          const order = await Order.findById(newOrder._id)
            .populate("owner", "-password")
            .populate("orderItems.product");
          res.status(201).send(order);
        }
      } else {
        res
          .status(401)
          .send({ msg: "You are not authorized to preform this action." });
      }
    } catch (error) {
      res.status(500).send({ msg: "Order not created.", error });
      console.log(error);
    }
  },
  getOrder: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
      );
      if (order) {
        res.status(201).send(order);
      } else {
        res.status(404).send("Order not found");
      }
    } catch (error) {
      res.status(500).send("Order not created", error);
    }
  },
  updateOrderToPaid: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.payer.email_address,
        };

        const updatedOrder = await order.save();

        res.json(updatedOrder);
      } else {
        res.status(404).send("Order not found");
      }
    } catch (error) {
      res.status(500).send("Order not updated", error);
    }
  },
  updateOrderToDelivered: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);

      if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();

        res.json(updatedOrder);
      } else {
        res.status(404).send("Order not found");
      }
    } catch (error) {
      res.status(500).send("Order To Delivered not updated", error);
    }
  },
  getMyOrders: async (req, res) => {
    try {
      const orders = await Order.find({ user: req.userID });
      res.json(orders);
    } catch (error) {
      res.status(500).send("Can not get orders", error);
    }
  },
  getOrders: async (req, res) => {
    try {
      const orders = await Order.find({}).populate("user", "id name");
      res.json(orders);
    } catch (error) {
      res.status(500).send("Can not get orders for admin", error);
    }
  },
};
