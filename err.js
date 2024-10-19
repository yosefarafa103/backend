class ApplicationErr extends Error {
  constructor() {}

  createErr(statusCode, message) {
    console.log(this);
  }
}
module.exports = ApplicationErr;


