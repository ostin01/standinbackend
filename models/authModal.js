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
    userType: { type: String, require: true, default: "client" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
