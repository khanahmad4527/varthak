const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    roles: [
      {
        type: String,
        required: true,
        enum: ["CREATOR", "VIEWER", "VIEW_ALL"],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };
