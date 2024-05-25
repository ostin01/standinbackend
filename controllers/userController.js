const User = require("../models/authModal");

// @Desc  get user
// @Route POST api/getme
// @Access private

const getme = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(
      { _id: userId },
      { password: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    );
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving user", error: error.message });
  }
};

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
}

module.exports = { getme, getAllUsers };
