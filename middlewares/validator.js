const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User");
require("dotenv").config();

const createValidator = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
      if (err) {
        return res.status(400).json({ message: "Invalid token" });
      }

      if (decoded) {
        const isUserExist = await UserModel.findById(decoded.id);

        if (!isUserExist) {
          return res.status(404).json({ message: "No user found" });
        } else {
          if (isUserExist.roles.includes("CREATOR")) {
            req.body.userId = decoded.id;
            return next();
          } else {
            return res.status(401).json({ message: "Unauthorized" });
          }
        }
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const viewValidator = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
      if (err) {
        return res.status(400).json({ message: "Invalid token" });
      }

      if (decoded) {
        const isUserExist = await UserModel.findById(decoded.id);

        if (!isUserExist) {
          return res.status(404).json({ message: "No user found" });
        } else {
          if (isUserExist.roles.includes("VIEWER")) {
            req.body.userId = decoded.id;
            return next();
          } else if (isUserExist.roles.includes("VIEW_ALL")) {
            req.body.userId = decoded.id;
            return next();
          } else {
            return res.status(401).json({ message: "Unauthorized" });
          }
        }
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createValidator, viewValidator };
