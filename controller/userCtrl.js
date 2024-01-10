const { User } = require("../model/index");
const { Op } = require("sequelize");

const showMe = async (req, res) => {
  res.status(200).json(req.user);
};

const getUsers = async (req, res) => {
  const { username } = req.body;
  const users = await User.findAll({
    where: {
      name: {
        [Op.like]: username,
      },
    },
  });

  res.status(200).json(users);
};
module.exports = { showMe, getUsers };
