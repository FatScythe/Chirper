const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} = require("../error");
const { Chat, Message } = require("../model");

const getChatMessages = async (req, res) => {
  /*
    This fn gets all the messages in a chat in asc order,
    accessible only to the chat member
  */
  const { id: chatId } = req.params;
  const userId = req.user.userId;

  const chat = await Chat.findByPk(chatId);

  if (!chat) {
    throw new BadRequestError("Chat does not exist");
  }

  const isUserChat = await chat.hasUser(userId);

  if (!isUserChat) {
    throw new UnauthorizedError("Only chat members can view chat messages");
  }

  const messages = await chat.getMessages({ order: [["createdAt", "ASC"]] });

  res.status(200).json(messages);
};

const createMessage = async (req, res) => {
  /*
    This fn creates a message in a chat only for chat members
  */
  const { text, chatId } = req.body;
  const sender = req.user.userId;

  if (!text) {
    throw new BadRequestError("Please provide text for message");
  }

  if (!chatId) {
    throw new BadRequestError("Please provide a valid chat id");
  }

  const chat = await Chat.findByPk(chatId);

  if (!chat) {
    throw new BadRequestError("Chat does not exist");
  }

  const isChatMember = await chat.hasUser(sender);

  if (!isChatMember) {
    throw new UnauthorizedError("Only members of the chat can send messages");
  }

  await chat.createMessage({ text, sender });

  chat.changed("updatedAt", true);
  await chat.update({
    updatedAt: new Date(),
  }); // This just updates the chat updatedAT column

  res.status(201).json({ msg: "Message sent" });
};

const editMessage = async (req, res) => {
  /*
    This fn edits message in a chat only for message sender
  */
  const { id: messageId } = req.params;
  const { text } = req.body;
  const userId = req.user.userId;

  if (!text) {
    throw new BadRequestError("Please provide a valid text");
  }

  const message = await Message.findByPk(messageId);
  if (!message) {
    throw new NotFoundError("Message was not found");
  }

  if (message.sender !== userId) {
    throw new UnauthorizedError("Only message sender can edit");
  }

  await message.update({ text });

  res.status(200).json({ msg: "Message updated" });
};

const deleteMessage = async (req, res) => {
  /*
    This fn delete message in a chat only for message sender
  */
  const { id: messageId } = req.params;
  const userId = req.user.userId;

  const message = await Message.findByPk(messageId);
  if (!message) {
    throw new NotFoundError("Message was not found");
  }

  if (message.sender !== userId) {
    throw new UnauthorizedError("Only message sender can edit");
  }

  await message.destroy();

  res.status(200).json({ msg: "Message deleted" });
};

module.exports = { getChatMessages, createMessage, deleteMessage, editMessage };
