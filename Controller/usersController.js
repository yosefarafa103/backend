const { createDocument } = require("../utils/mainFunctions");
const User = require("./../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res, next) => {
  const newUser = await User.create(req.body);
  const hashedPassword = await bcrypt.hash(newUser.password, 12);
  console.log(hashedPassword);
  newUser.password = hashedPassword;
  newUser.confirmPassword = hashedPassword;
  await newUser.save();
  if (!newUser) {
    return next(err);
  }
  res.status(201).json(newUser);
};
const sendResponseWithToken = (
  tokenPayload,
  statusCode,
  responseObject,
  data = undefined
) => {
  const token = jwt.sign({ id: tokenPayload }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRESSION,
  });

  responseObject.cookie("jwt", token, {
    expiresIn: process.env.TOKEN_EXPIRESSION,
    httpOnly: true,
  });
  responseObject.status(statusCode).json({
    token,
    data,
  });
};
exports.login = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  const isMatched = await bcrypt.compare(
    req.body.password,
    user.password || " "
  );
  sendResponseWithToken(user._id, 200, res, user);
  //   res.status(200).json(user);
  if (!user) {
    return next(`no user found with this username.`);
  }
  if (!isMatched) {
    return next("incorrect password!");
  }
};
