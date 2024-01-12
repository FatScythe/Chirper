const { User, sequelize } = require("../model/index");
const { Op } = require("sequelize");

const showMe = async (req, res) => {
  res.status(200).json(req.user);
};

const getUsers = async (req, res) => {
  const { id: username } = req.params;
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
    where: {
      name: {
        [Op.iLike]: username + "%",
      },
    },
    limit: 5,
  });

  res.status(200).json(users);
};
module.exports = { showMe, getUsers };
