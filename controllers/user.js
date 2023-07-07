const bcrypt = require("bcrypt");
require("dotenv").config();
const { UserModel } = require("../models/User");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { firstname, lastname, email, password, roles } = req.body;
  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(409).json({
        message:
          "The email address you are trying to register is already in use. Please choose a different email address.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel({
      firstname,
      lastname,
      email,
      hashedPassword,
      roles,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "Registration successful.", userId: newUser._id });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      const {
        _id: id,
        firstname,
        lastname,
        hashedPassword,
        email,
        roles,
      } = userExist;
      const isCorrect = await bcrypt.compare(password, hashedPassword);
      if (!isCorrect) {
        return res.status(401).json({
          message: "Incorrect Password",
          description: "Please enter correct password.",
        });
      } else {
        jwt.sign(
          { id, firstname, lastname, email, roles },
          process.env.JWT_SECRET,
          {
            expiresIn: "3d",
          },
          (error, token) => {
            if (error) {
              return res.status(500).json({ message: error });
            }
            res.status(200).json({
              message: "Login Successful",
              token,
            });
          }
        );
      }
    } else {
      return res.status(404).json({
        message: "User not found. Please check your email and try again.",
      });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = { login, signup };
