class CustomAPIError extends Error {
  constructor(message, statuscode = 500) {
    super(message);
    this.statusCode = statuscode;
  }
}

module.exports = CustomAPIError;
