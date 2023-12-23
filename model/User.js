require("dotenv").config();
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 50],
            msg: "Password cannot be less than 6 characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Please enter a valid email",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
      },
      avatar: {
        type: DataTypes.STRING,
        defaultValue: "/avatar.png",
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt(parseInt(process.env.saltRounds));
          const hashedPwd = await bcrypt.hash(user.password, salt);

          user.password = hashedPwd;
        },
      },
    }
  );

  User.prototype.comparePwd = function (password) {
    const isValid = bcrypt.compareSync(password, this.password);
    return isValid;
  };

  return User;
};
