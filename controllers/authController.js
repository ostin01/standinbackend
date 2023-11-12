// @Desc  Register users
// @Route POST api/register
// @Access Public
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/authModal");
const admin = require("firebase-admin");
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
    // check if all fields are filled
    if (!first__name || !last__name || !email || !password) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }

    // Check if user already exists and create user
    try {
      await admin.auth().getUserByEmail(email);
      return res.status(400).json({ mssg: "Email already in use" });
    } catch (error) {
      // If the user doesn't exist, create a new user
      if (error.code === "auth/user-not-found") {
        try {
          const userResponse = await admin.auth().createUser({
            email,
            password,
          });

          // Hash the password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

          // create user in mongodb
          const user = await User.create({
            first__name,
            last__name,
            email,
            uid: userResponse.uid,
            password: hashedPassword,
          });

          if (user) {
            return res.status(201).json({
              _id: user.id,
              first__name: user.first__name,
              last__name: user.last__name,
              email: user.email,
              profilePhoto: user.profilePhoto,
              userType: user.userType,
              uid: user.uid,
              token: generateToken(user._id),
            });
          } else {
            return res.status(400).json({ mssg: "Invalid user data" });
          }
        } catch (error) {
          // Handle error during user creation
          return res.status(500).json({ mssg: "Error creating user" });
        }
      } else {
        // Handle other errors during user retrieval
        return res.status(500).json({ mssg: "Error retrieving user" });
      }
    }
  } catch (error) {
    // Handle any other errors if needed
    return res.status(500).json({ mssg: "Internal Server Error" });
  }
};

// Login user
// @Desc  Login users
// @Route  POST api/login
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
    res.status(400).json({
      mssg: "Invalid login parameters, please check email and password",
    });
  }
};
module.exports = {
  register,
  login,
};
