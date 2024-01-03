const { db, user, password, host, dialect } = require("../config").postgres;
const { Sequelize, DataTypes, Op } = require("sequelize");
const User = require("./User");
const Chat = require("./Chat");
const Message = require("./Message");
const Member = require("./Member");

const sequelize = new Sequelize(db, user, password, { host, dialect });
let models = {
  User: User(sequelize, DataTypes),
  Chat: Chat(sequelize, DataTypes),
  Message: Message(sequelize, DataTypes),
  Member: Member(sequelize, DataTypes),
};

// User X Chats Many-to-Many
models.User.belongsToMany(models.Chat, {
  through: models.Member,
  foreignKey: "userId",
});

models.Chat.belongsToMany(models.User, {
  through: models.Member,
  foreignKey: "chatId",
});

// User X Message Many-to-One
models.User.hasMany(models.Message);
models.Message.belongsTo(models.User);

// Message X Chat Many-to-One
models.Chat.hasMany(models.Message);
models.Message.belongsTo(models.Chat);

sequelize
  .sync({ alter: true })
  .then(async () => {
    console.log("Synced Successfully");
  })
  .catch((err) => {
    console.error("Unable to sync!");
    console.error(err);
  });

module.exports = {
  sequelize,
  ...models,
};
