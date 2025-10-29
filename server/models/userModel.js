const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
  phq9Results: {
    type: [
      {
        score: { type: Number },
        level: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("Users", userSchema);
