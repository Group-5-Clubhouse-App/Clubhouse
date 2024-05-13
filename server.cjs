const express = require("express");
const app = express();
const authRouter = require('./auth');
const PORT = process.env.PORT || 8080;


app.use('/auth', authRouter);


app.listen(PORT, () => {
    console.log(`listening on Port ${PORT}`);
  });

  