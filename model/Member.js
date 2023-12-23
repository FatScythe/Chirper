const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Member extends Model {}
  Member.init({}, { sequelize, tableName: "members", timestamps: false });

  return Member;
};
