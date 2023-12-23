const { BadRequestError, NotFoundError } = require("../error");
const { User } = require("../model");
const createTokenUser = require("../utils/createTokenUser");
const { attachCookieToResponse } = require("../utils/jwt");

const register = async (req, res) => {
  const { name, password, email, phoneNumber } = req.body;
  if (!name || !password || !email || !phoneNumber) {
    throw new BadRequestError("Please fill all fields!");
  }

  await User.create({ name, password, email, phoneNumber });

  res.status(201).json({ msg: "User created!" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    throw new BadRequestError("Please fill all fields!");
  }

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw new NotFoundError("Invalid Credentials");
  }

  const isPasswordValid = await user.comparePwd(password);

  if (!isPasswordValid) {
    throw new BadRequestError("Invalid Credentials!");
  }

  const tokenUser = createTokenUser(user);

  attachCookieToResponse(res, tokenUser);

  res.status(200).json(tokenUser);
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ msg: "Logged Out Sucessfully" });
};

module.exports = { register, login, logout };
