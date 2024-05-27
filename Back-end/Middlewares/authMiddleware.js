require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../Model/User");

/* Step one :Authentication */
const verifyToken = async (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies?.split("=")[1];
  if (!token) {
    return res.status(400).json({ message: "token not found!" });
  }

  jwt.verify(String(token), process.env.JWT_VERIFY_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: " invalid token " });
    }
    req.user = user;
    next();
  });
};

/* Authorization for normal user and admin */
const isAuth = async (req, res, next) => {
  /* acceshe token) by previous object! */
  verifyToken(req, res, () => {
    if (req.user.id || req.user.isAdmin) {
      next();
    } else {
      res.send("you are not authorized!");
    }
  });
};

/* Authorization only for Admin */
const isAdmin = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.send("you are not authorized!");
    }
  });
};
module.exports = {
  verifyToken,
  isAuth,
  isAdmin,
};
