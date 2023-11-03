// @Desc  Register users
// @Route POST api/users
// @Access Public
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/authModal");
//
//
//
//Generate JWT

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const register = async (req, res) => {
  const { first__name, last__name, email, password } = req.body;
  try {
    if (!first__name || !last__name || !email || !password) {
      res.status(400).json({ msg: "Please fill all fields" });
    }

    // Check if user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ mssg: "User already exist please login" });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      first__name,
      last__name,
      email,
      password: hashedPassword,
    });

    // check if user was created and send back token

    if (user) {
      res.status(201).json({
        _id: user.id,
        first__name: user.first__name,
        last__name: user.last__name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ mssg: "Invalid user data" });
    }
  } catch (error) {
    console.log(error);
  }
};

// Login user
// @Desc  Login users
// @Route  POST api/users/login
// @Access Public

const login = async (req, res) => {
  const { email, password } = req.body;
  // check the email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ mssg: "Invalid login parameters" });
  }
};
module.exports = {
  register,
  login,
};
