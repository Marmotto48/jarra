const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("token");
    const verifyToken = jwt.verify(token, process.env.SecretKey);
    if (!verifyToken) res.status(401).json({ msg: "you are not authorized" });
    req.userID = verifyToken.id;
    next();
  } catch (error) {
    res.status(500).json({ msg: error });
    // console.log(error);
  }
};

module.exports = auth;

// const User = require("../models/User");

// const isAuth = async (req, res, next) => {
//   try {
//     const token = req.headers["authorization"];
//     if (!token) {
//       return res.status(401).send({ errors: [{ msg: "Not Authorized" }] });
//     }

//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     // {
//     // _id:""
//     // }
//     if (!decoded) {
//       return res.status(401).send({ errors: [{ msg: "Not Authorized" }] });
//     }
//     const findUser = await User.findById(decoded._id);
//     if (!findUser) {
//       return res.status(401).send({ errors: [{ msg: "Not Authorized" }] });
//     }
//     req.user = findUser;
//     next();
//   } catch (error) {
//     return res.status(401).send({ errors: [{ msg: "Not Authorized" }] });
//   }
// };
// module.exports = isAuth;
