const Product = require("../models/products");

module.exports = {
  getAll: async (req, res) => {
    try {
      const products = await Product.find({});
      if (products.length === 0) {
        res.status(200).send({ msg: "There no products yet." });
      } else {
        res.status(200).send({ msg: "Products fetched succefully", products });
      }
    } catch (error) {
      res.status(500).send({ msg: "can not get products", error });
    }
  },
  getOne: async (req, res) => {
    try {
      //const compaignID = req.body;
      const productID = req.params.id;
      const product = await Product.findById(productID).populate(
        "owner",
        "-password"
      );
      if (product) {
        res.status(200).send(product);
      } else {
        res.status(404).send({
          msg: "This product does not exist.",
        });
      }
    } catch (error) {
      res.status(500).send({ msg: "Can not get product information.", error });
    }
  },
  create: async (req, res) => {
    try {
      const {
        name,
        image,
        brand,
        category,
        rating,
        numReviews,
        price,
        countInStock,
        reviews,
      } = req.body;

      if (req.userType === "seller") {
        const newProduct = await Product.create({
          owner: req.userID,
          name,
          image,
          brand,
          category,
          rating,
          numReviews,
          price,
          countInStock,
          reviews,
        });
        const product = await Product.findById(newProduct._id).populate(
          "owner",
          "-password"
        );
        res.status(201).send({ Product: product });
      } else {
        res
          .status(401)
          .send({ msg: "You are not authorized to preform this action." });
      }
    } catch (error) {
      res.status(500).send({ msg: error });
      console.log(error);
    }
  },
  update: async (req, res) => {
    try {
      const { name, desc, brand, category, price, countInStock } = req.body;
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          name,
          desc,
          brand,
          category,
          price,
          countInStock,
        },
        { new: true }
      );
      if (product.owner._id.valueOf() === req.userID) {
        res.status(200).send(product);
      } else {
        res
          .status(401)
          .send({ msg: "You are not authorized to preform this action." });
      }
    } catch (error) {
      res.status(500).send({ msg: "Can not update product.", error });
    }
  },
  review: async (req, res) => {
    try {
      const { rating, comment } = req.body;

      const product = await Product.findById(req.params.id);
      if (product) {
        // const reviwerID = product.reviews.find((r) => r.user).user.valueOf();

        const alreadyReviewed = product.reviews.find(
          (r) =>
            product.reviews.find((r) => r.user).user.valueOf() === req.userID
        );
        if (alreadyReviewed) {
          res.status(400).send({ msg: "already reviewed." });
        } else {
          const review = {
            name: req.userName,
            rating: Number(rating),
            comment,
            user: req.userID,
          };

          product.reviews.push(review);

          product.numReviews = product.reviews.length;

          product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

          await product.save();
        }

        res.status(201).json({ message: "Review added" });
      } else {
        res.status(404).send("Product not found");
      }
    } catch (error) {
      res.status(500).send({ msg: "Can not add review.", error });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        if (product.owner._id.valueOf() === req.userID) {
          await product.remove();
          res.status(200).send({ msg: "Product deleted." });
        } else {
          res.status(401).send({
            msg: "You are not authorized to preform this action.",
          });
        }
      } else {
        res.status(404).send({
          msg: "This product does not exist.",
        });
      }
    } catch (error) {
      res.status(500).json({ msg: "Can not delete product.", error });
      console.log(error);
    }
  },
  getTopProducts: async (req, res) => {
    try {
      const products = await Product.find({}).sort({ rating: -1 }).limit(3);

      res.status(200).send(products);
    } catch (error) {
      res.status(500).send({ msg: "Can not get top products.", error });
    }
  },
};
