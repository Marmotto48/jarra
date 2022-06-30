const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/JoiValidation");
const cloudinary = require("../middleware/cloudinary");

module.exports = {
  //register new user
  register: async (req, res) => {
    try {
      const errors = [];
      //Validation
      const { error } = registerValidation(req.body);
      if (error) {
        const { details } = error;
        details.forEach((item) => errors.push(item.message));
        return res.json({ status: 406, msg: errors });
      }
      const {
        accountType,
        firstName,
        lastName,
        username,
        email,
        password,
        bio,
        lastLogin,
        status,
        followers,
      } = req.body;
      //unique email
      const searchEmail = await User.findOne({ email });
      if (searchEmail) {
        return res.status(400).send({ msg: "Email already exists." });
      }
      //hash password
      const salt = 10;
      const genSalt = bcrypt.genSaltSync(salt);
      const hashedPW = await bcrypt.hash(password, genSalt);
      //save new User //token
      const newUser = await User.create({
        accountType,
        firstName,
        lastName,
        username,
        email,
        password: hashedPW,
        bio,
        lastLogin,
        status,
        followers,
      });
      //Token
      const token = jwt.sign(
        {
          username: newUser.name,
          phone: newUser.phone,
          email: newUser.email,
          id: newUser._id,
        },
        process.env.SecretKey
      );
      const user = await User.findById(newUser._id).select("-password");
      res.status(201).send({ User: user, token });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        msg: "Cannot save new user please check your information again.",
        error,
      });
    }
  },
  //login User
  login: async (req, res) => {
    try {
      const errors = [];
      //Validation
      const { error } = loginValidation(req.body);
      if (error) {
        const { details } = error;
        details.forEach((item) => errors.push(item.message));
        return res.json({ status: 406, msg: errors });
      }
      const { email, password } = req.body;
      //   find if the user exist
      const searchedUser = await User.findOne({ email });

      //if the email does not exist
      if (!searchedUser) {
        return res.status(400).send({
          msg: "Not a member ? Join our community !",
        });
      }
      // password are equals
      const match = await bcrypt.compare(password, searchedUser.password);
      if (!match) {
        return res.status(400).send({
          msg: "Your email or password is wrong, please try again.",
        });
      }
      // generate token
      const token = jwt.sign(
        {
          id: searchedUser._id,
          username: searchedUser.username,
          accountType: searchedUser.accountType,
        },
        process.env.SecretKey
      );
      //LAST LOGIN
      const user = await User.findByIdAndUpdate(
        searchedUser._id,
        { $set: { lastLogin: Date.now() } },
        { new: true }
      ).select("-password");
      res.status(201).send({ User: user, token });
    } catch (error) {
      res.status(500).send({ msg: "Can not login user." });
      console.log(error);
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      res.status(200).send(user);
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: "Can not get user.", error });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const {
        accountType,
        firstName,
        lastname,
        username,
        lastLogin,
        status,
        bio,
      } = req.body;
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          accountType,
          firstName,
          lastname,
          username,
          lastLogin,
          status,
          bio,
        },
        { new: true }
      );
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ msg: "Can not update profile.", error });
    }
  },
  delete: async (req, res) => {
    try {
      const deleteUser = await User.findByIdAndDelete(req.params.id);
      res.status(200).send({ msg: "User deleted.", deleteUser });
    } catch (error) {
      res.status(500).send({ msg: "Can not delete user.", error });
    }
  },
  getAll: async (req, res) => {
    try {
      const users = await User.find({
        _id: { $ne: req.userID },
      }).select("-password");
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send({ msg: "can not get users", error });
    }
  },
  getSellers: async (req, res) => {
    try {
      const sellers = await User.find({ accountType: "seller" }).select(
        "-password"
      );
      res.json(sellers);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Can not get sellers.", error });
    }
  },
  getBuyers: async (req, res) => {
    try {
      const buyers = await User.find({ accountType: "buyer" }).select(
        "-password"
      );
      res.json(buyers);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Can not get doctor buyers.", error });
    }
  },
  updateAvatar: async (req, res) => {
    try {
      const imageInfo = await cloudinary.uploader.upload(req.file.path);
      const existUser = await User.findById(req.params.id);
      cloudinary.uploader.destroy(existUser.avatar.public_id);
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        avatar: {
          imageURL: imageInfo.url,
          public_id: imageInfo.public_id,
        },
      });
      res.send(updatedUser);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error });
    }
  },
  getCurrent: async (req, res) => {
    try {
      const userID = req.userID;
      // const customerID = req.body;
      const user = await User.findById(userID).select("-password");
      res.status(200).send(user);
    } catch (error) {
      // console.log(error);
      res.status(500).send({ msg: "Can not get user.", error });
    }
  },
};
