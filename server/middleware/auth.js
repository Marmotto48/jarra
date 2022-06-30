const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("token");
    const verifyToken = jwt.verify(token, process.env.SecretKey);
    if (!verifyToken) res.status(401).json({ msg: "you are not authorized" });
    req.userID = verifyToken.id;
    req.userType = verifyToken.accountType;
    req.userName = verifyToken.username;
    next();
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// const admin = (req, res, next) => {
//   if ( req.accountType === "seller") {
//     console.log(req.accountType);
//     next();
//   } else {
//     res.status(401);
//     throw new Error("Not authorized as an admin");
//   }
// };
module.exports = { auth };
