module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("message", {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sender: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Message;
};
