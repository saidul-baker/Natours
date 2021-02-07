/* eslint-disable prettier/prettier */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;

    const aString = statusCode.toString();
    if (aString[0] === "4") {
      this.status = "fail";
    } else {
      this.status = "error";
    }
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;
