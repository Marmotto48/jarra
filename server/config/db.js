const mongoose = require("mongoose");
// // const winston = require("winston");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.error("Connection to databse failed", error);
  }
};
// module.exports = connectDB;
// const mongoose = require("mongoose");

// module.exports = function () {
//   mongoose
//     .connect(process.env.URI, {
//       useCreateIndex: true,
//       useNewUrlParser: true,
//     })
//     .then(() => console.log(`Connected to ${db}... `));
// };
