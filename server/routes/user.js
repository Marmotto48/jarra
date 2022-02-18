const express = require("express");
const {
  register,
  login,
  getUser,
  getAll,
  updateAvatar,
  updateProfile,
  getCurrent,
  getSellers,
  getBuyers,
} = require("../controllers/user");
const router = express.Router();
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("../middleware/cloudinary");
const auth = require("../middleware/auth");
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "user_avatar",
  },
});
const upload = multer({ storage });

// @desc Register new user
// @route POST /user/register
// @access Private route
router.post("/register", register);

// @desc Login user
// @route POST /user/login
// @access Private route
router.post("/login", login);

// @desc Get one user
// @route GET /user/getuser/:id
// @access Public route
router.get("oneuser/:id", getUser);

// @desc Get All user
// @route GET /user/
// @access Public route
router.get("/", getAll);

// @desc Get All user
// @route GET /user/
// @access Public route
router.get("/sellers", getSellers);

// @desc Get All user
// @route GET /user/
// @access Public route
router.get("/buyers", getBuyers);
// @desc Update user avatar
// @route PUT /user/updateimg/:id
// @access Private route
router.put("/updateimg/:id", upload.single("avatar"), auth, updateAvatar);

// @desc Update user profile info
// @route PUT /user/:id
// @access Private route
router.put("oneuser/:id", auth, updateProfile);

// @desc Get current user
// @route GET /user/current/user
// @access Private route
router.get("/current/user", auth, getCurrent);

module.exports = router;
