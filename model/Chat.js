const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {}
  Chat.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      chatType: {
        type: DataTypes.STRING,
        defaultValue: "private",
        validate: {
          isIn: {
            args: [["private", "group"]],
            msg: "Please provide a valid chat type",
          },
        },
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      members: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
    },
    { sequelize, tableName: "chats" }
  );

  return Chat;
};
