const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        res.status(403).json({ status: false, mssg: "invalid token" });
      }
      req.user = user;
      next();
    });
  }
};

module.exports = { verifyToken };
