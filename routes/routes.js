const express = require("express");
const router = express.Router();

/***************** controllers *****************/
const { login, signup } = require("../controllers/user");
const { addBook, viewBook } = require("../controllers/book");

/***************** middlewares *****************/
const { createValidator, viewValidator } = require("../middlewares/validator");

/***************** user *****************/
router.post("/user/auth/register", signup);
router.post("/user/auth/login", login);

/***************** book *****************/
router.post("/books", createValidator, addBook);
router.get("/books", viewValidator, viewBook);

module.exports = { router };
