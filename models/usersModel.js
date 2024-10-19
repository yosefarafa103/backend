const { Schema, model } = require("mongoose");
const validator = require("validator");

const usersSchema = Schema({
  username: {
    type: String,
    required: [
      true,
      "username is required, please enter your username to continue",
    ],
  },
  password: {
    type: String,
    minLength: [6, "password should be greater or equal 6 characters"],
    required: [
      true,
      "password is required, please enter your password to continue",
    ],
  },
  confirmPassword: {
    type: String,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "please enter the correct password",
    },
    required: [
      true,
      "confirm password is required, please enter your confirm password to continue",
    ],
  },
});

usersSchema.pre("save", async function (next) {
  this.confirmPassword = undefined;
  next();
});
const userModel = model("User", usersSchema);
module.exports = userModel;
