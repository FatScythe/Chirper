const CustomAPIError = require("./custom-error");
const BadRequestError = require("./badrequest-error");
const NotFoundError = require("./notfound-error");
const UnauthenticatedError = require("./unauthentication-error");
const UnauthorizedError = require("./unauthorized-error");

module.exports = {
  CustomAPIError,
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
};
