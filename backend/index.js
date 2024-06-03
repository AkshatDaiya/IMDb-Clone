const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);
app.use(express.json());
const session = require("./helper/session");
const UserRouter = require("./router/user.router");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use("/api", UserRouter);
app.use(session);
app.use(express.static("public"));
app.listen(process.env.PORT, () => {
  console.log(`Api server is running on port no. ${process.env.PORT}`);
});
