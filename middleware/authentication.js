const { BadRequestError, UnauthorizedError } = require("../error");
const { isTokenValid } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  try {
    if (!token) {
      throw new BadRequestError("Invalid Credentials");
    }
    const { name, description, userId, email, avatar } = isTokenValid(token);
    req.user = { name, userId, email, description, avatar };

    next();
  } catch (error) {
    throw new UnauthorizedError("Invalid Credentials");
  }
};

module.exports = {
  authenticateUser,
};
