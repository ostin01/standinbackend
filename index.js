const express = require("express");
const connectDB = require("./config/DB");

const app = express();

require("dotenv").config();

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/", require("./routes/userRoutes"));
