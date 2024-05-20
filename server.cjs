require("dotenv").config();
const express = require("express");
const app = express();
const authRouter = require("./auth/index.cjs");
const apiRouter = require("./api/index.cjs");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`listening on Port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`Hello welcome to the / route`);
});
app.use("/auth", authRouter);

app.use("/api", apiRouter);
