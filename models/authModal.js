const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    first__name: {
      type: String,
      require: [true, "please add a name"],
    },
    last__name: {
      type: String,
      require: [true, "please add a name"],
    },
    email: {
      type: String,
      require: [true, "please add an Email"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "please add a password"],
    },
    profilePhoto: {
      type: String,
      require: true,
      default: "",
    },
    address: {
      type: Array,
      require: false,
    },
    userType: {
      type: String,
      require: true,
      default: "client",
      enum: ["client", "standin"],
    },
    uid: {
      type: String, // Use the data type that matches your custom ID
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
