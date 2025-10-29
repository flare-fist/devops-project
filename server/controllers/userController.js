const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const userObj = user.toObject();
    delete userObj.password;
    return res.json({ status: true, user: userObj });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    const userObj = user.toObject();
    delete userObj.password;
    return res.json({ status: true, user: userObj });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

const axios = require("axios");
const express = require("express");
const router = express.Router();

module.exports.getAvatars = async (req, res, next) => {
  try {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const response = await axios.get(
        `https://avatars.dicebear.com/api/avataaars/seed${i}.svg`,
        { responseType: "text" }
      );
      const base64 = Buffer.from(response.data, "utf8").toString("base64");
      data.push(base64);
    }
    return res.json(data);
  } catch (ex) {
    next(ex);
  }
};

// Save a PHQ-9 result for a user
module.exports.savePhq9 = async (req, res, next) => {
  try {
    const { userId, score, level } = req.body;
    if (!userId) return res.status(400).json({ msg: "userId required", status: false });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found", status: false });
    user.phq9Results.push({ score, level, date: new Date() });
    await user.save();
    return res.json({ status: true, result: user.phq9Results[user.phq9Results.length - 1] });
  } catch (ex) {
    next(ex);
  }
};

// Get latest PHQ-9 result for a user
module.exports.getPhq9 = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (!userId) return res.status(400).json({ msg: "userId required", status: false });
    const user = await User.findById(userId).select(["phq9Results"]);
    if (!user) return res.status(404).json({ msg: "User not found", status: false });
    const results = user.phq9Results || [];
    const latest = results.length ? results[results.length - 1] : null;
    return res.json({ status: true, result: latest });
  } catch (ex) {
    next(ex);
  }
};
