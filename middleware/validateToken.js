const jsonWebToken = require("jsonwebtoken");
const { promisify } = require("util");
const validateToken = async (req, res, next) => {
  console.log();
  try {
    await promisify(jsonWebToken.verify)(
      req.cookies.jwt,
      process.env.TOKEN_SECRET
    );
    next();
  } catch (err) {
    return next(err);
  }
};

module.exports = validateToken;
