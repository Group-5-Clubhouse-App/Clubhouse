require("dotenv").config();
const express = require("express");
const app = express();
const authRouter = require('./auth/index.cjs');
const PORT = process.env.PORT || 8080;
const cors = require("cors");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.listen(PORT, () => {
    console.log(`listening on Port ${PORT}`);
  });

app.get("/", (req, res) => {
  res.send(`Hello welcome to the / route`);
});
app.use("/auth", authRouter);

  