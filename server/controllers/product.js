const Product = require("../models/products");

module.exports = {
  getAll: async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).send({ msg: "Products fetched succefully", products });
    } catch (error) {
      res.status(500).send({ msg: "can not get products", error });
    }
  },
  getOne: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        res.status(200).send(product);
      } else {
        res.status(404).send("Product not found");
      }
    } catch (error) {
      res.status(500).send({ msg: "can not get product", error });
      console.log(error);
    }
  },
};
