const express = require("express");
const app = express();
require("dotenv").config();
require("./config/db")();
const port = process.env.PORT || 5000;
const http = require("http");
const server = http.createServer(app);
const path = require("path");
const { errorHandling, notFound } = require("./middleware/error");

//---------------Connect Database----------------//
// connectDB();
// --------------------------middleware routing body parse------------------------------
app.use(express.json());
//---------------Routes----------------//
app.use("/user", require("./routes/user"));
app.use("/product", require("./routes/product"));
app.use("/order", require("./routes/order"));
//error handling
app.use(errorHandling);
//not found
app.use(notFound);
server.listen(port, (error) => {
  error ? console.log(error) : console.log(`Server running on port ${port}`);
});
