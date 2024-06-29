const express = require("express");
const connectDB = require("./config/DB");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();

const admin = require("firebase-admin");
const serviceAccount = require("../standinbackend/serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/", require("./routes/authRoute"));
app.use("/api/", require("./routes/userRoute"));
