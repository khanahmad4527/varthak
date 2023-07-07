const { BookModel } = require("../models/Book");
const { UserModel } = require("../models/User");

const addBook = async (req, res) => {
  const {
    title,
    author,
    publicationYear,
    description,
    genres,
    price,
    quantity,
    userId,
  } = req.body;

  try {
    const newBook = new BookModel({
      title,
      author,
      publicationYear,
      description,
      genres,
      price,
      quantity,
      createdBy: userId,
    });

    await newBook.save();

    return res.status(201).json(newBook);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const viewBook = async (req, res) => {
  const { userId } = req.body;

  const { old, new: newTime } = req.query;

  try {
    const { roles } = await UserModel.findById(userId);

    if (roles.includes("VIEW_ALL")) {
      try {
        if (old) {
          if (!isNaN(old)) {
            const timeInMin = Math.floor(Number(old)) * 10;
            const time = new Date(Date.now() - timeInMin * 60 * 1000);

            const books = await BookModel.find({
              createdAt: { $lte: time },
            });
            return res.status(200).json(books);
          } else {
            return res.status(400).json({ message: "Invalid query" });
          }
        } else if (newTime) {
          if (!isNaN(newTime)) {
            const timeInMin = Math.floor(Number(newTime)) * 10;
            const time = new Date(Date.now() - timeInMin * 60 * 1000);

            const books = await BookModel.find({
              createdAt: { $gt: time },
            });
            return res.status(200).json(books);
          } else {
            return res.status(400).json({ message: "Invalid query" });
          }
        } else {
          const books = await BookModel.find();

          if (!books) {
            return res.status(404).json({ message: "No book found" });
          }

          return res.status(200).json(books);
        }
      } catch (error) {
        return res.status(500).json({ message: "Server error" });
      }
    } else if (roles.includes("VIEWER")) {
      try {
        if (old) {
          if (!isNaN(old)) {
            const timeInMin = Math.floor(Number(old)) * 10;
            const time = new Date(Date.now() - timeInMin * 60 * 1000);

            const books = await BookModel.find({
              createdAt: { $lte: time },
            });
            return res.status(200).json(books);
          } else {
            return res.status(400).json({ message: "Invalid query" });
          }
        } else if (newTime) {
          if (!isNaN(newTime)) {
            const timeInMin = Math.floor(Number(newTime)) * 10;
            const time = new Date(Date.now() - timeInMin * 60 * 1000);

            const books = await BookModel.find({
              createdAt: { $gt: time },
            });
            return res.status(200).json(books);
          } else {
            return res.status(400).json({ message: "Invalid query" });
          }
        } else {
          const books = await BookModel.find();

          if (!books) {
            return res.status(404).json({ message: "No book found" });
          }

          return res.status(200).json(books);
        }
      } catch (error) {
        return res.status(500).json({ message: "Server error" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addBook, viewBook };
