const { User, Chat, Message, Member } = require("../model");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  UnauthenticatedError,
} = require("../error");
const { Op } = require("sequelize");

const createChat = async (req, res) => {
  /*  This fn takes 3 values: the chat name if it's not a private chat, 
      the chat type "private" | "group" and if it's a private type a participant id is required.
      It also checks the if the chat as been created before
  */
  const { name, chatType, memberIDs } = req.body;
  const userId = req.user.userId;

  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new NotFoundError("User does not exist");
  }

  if (!chatType) {
    throw new BadRequestError("Please provide a chat type");
  }

  if (!memberIDs || memberIDs.length < 1) {
    throw new BadRequestError("Please provide a member");
  }

  if (chatType === "private") {
    if (memberIDs.length > 1) {
      throw new BadRequestError("Private chats can only have one member");
    }

    // Checks if a private chat as been created by the current user
    if (userId === memberIDs[0]) {
      const isChatYours = await Chat.findOne({
        where: {
          chatType: "private",
          createdBy: userId,
          name: "Me(You)",
          members: [memberIDs[0]],
        },
      });
      if (isChatYours) throw new BadRequestError("Self chat already exist");
    }

    // Checks if a private chat as been created between current user and a member
    const isChatExist = await Chat.findOne({
      where: {
        chatType: "private",
        members: {
          [Op.or]: [
            [memberIDs[0], userId],
            [userId, memberIDs[0]],
          ],
        },
      },
    });

    if (isChatExist) {
      throw new BadRequestError("Chat as already been created!");
    }

    // Creates chat
    const chat = await user.createChat({
      name: memberIDs.includes(userId) ? "Me(You)" : "", // If chat is a self-chat
      chatType,
      createdBy: userId,
      members: memberIDs.includes(userId) ? [userId] : [userId, ...memberIDs],
    });

    await chat.addUser(memberIDs[0]); // Adds chat member to the junction model
  } else {
    if (!name) {
      throw new BadRequestError("Please provide a chat name");
    }
    const chat = await user.createChat({
      name,
      chatType,
      createdBy: userId,
      members: [userId, ...memberIDs],
    });

    for (let id of memberIDs) {
      await chat.addUser(id);
    }
  }

  res.status(201).json({ msg: "Chat created" });
};

const getMyChats = async (req, res) => {
  /*
    This fn get the current user chat(s)
  */
  const userId = req.user.userId;

  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new NotFoundError("User does not exist");
  }

  const chats = await user.getChats({
    include: [User, Message],
    order: [
      ["updatedAt", "DESC"], // Order Chats based on updatedAt time
      [{ model: Message }, "createdAt", "ASC"], // Order messages based on createdAt Time
    ],
  });

  res.status(200).json({ nb: chats.length, chats });
};

const getSingleChat = async (req, res) => {
  /* 
    This fn get the details of a chat
    and prevent non-members from checking 
  */
  const { id: chatId } = req.params;
  const userId = req.user.userId;

  const chat = await Chat.findOne({
    where: {
      id: chatId,
    },
    include: [User, Message],
    order: [[{ model: Message }, "createdAt", "ASC"]],
  });

  const isChatMember = await chat.hasUser(userId);

  if (!isChatMember) {
    throw new UnauthorizedError("Only chat members can view chat");
  }

  res.status(200).json(chat);
};

const deleteChat = async (req, res) => {
  /*
    This fn deletes a chat if the chat was created by them,
    a private chat member will only be removed from the chat 
  */
  const { id: chatId } = req.params;
  const userId = req.user.userId;

  const chat = await Chat.findOne({
    where: {
      id: chatId,
    },
  });

  if (!chat) {
    throw new NotFoundError("No chat with id: " + chatId + " exists");
  }

  if (chat.chatType === "private") {
    if (chat.createdBy === userId) {
      await chat.destroy();
    } else if (chat.members.includes(userId)) {
      chat.members = chat.members.filter((member) => member !== userId);
      await chat.save();
      await chat.removeUser(userId);
    } else {
      throw new UnauthorizedError(
        "Only chat member can perform this operation"
      );
    }
  } else {
    if (chat.createdBy === userId) {
      await chat.destroy();
    } else {
      throw new UnauthorizedError(
        "Only group creator can perform this operation"
      );
    }
  }

  res.status(200).json({ msg: "Chat deleted" });
};

const addGroupMember = async (req, res) => {
  /*
      This fn add member to a group, NB: only the group creator can
  */
  const { chatId, memberId } = req.body;
  const userId = req.user.userId;
  const chat = await Chat.findOne({
    where: {
      id: chatId,
    },
  });

  if (!chat) {
    throw new NotFoundError("No chat with id: " + chatId + " exists");
  }

  if (chat.chatType !== "group") {
    throw new BadRequestError("Chat must be of type group");
  }

  if (chat.createdBy !== userId) {
    throw new UnauthorizedError("Only group creator can add user(s)");
  }

  const user = await User.findOne({
    where: {
      id: memberId,
    },
  });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  await chat.addUser(user);

  res.status(200).json({ msg: `${user.name} as been added to the group` });
};

const leaveGroup = async (req, res) => {
  /*
    This fn exits the current user from a group
  */
  const { chatId } = req.body;
  const userId = req.user.userId;

  const chat = await Chat.findOne({
    where: {
      id: chatId,
    },
  });

  if (!chat) {
    throw new NotFoundError("No chat with id: " + chatId + " exists");
  }

  if (chat.chatType !== "group") {
    throw new BadRequestError("Chat must be of type group");
  }

  if (chat.createdBy === userId) {
    throw new UnauthenticatedError("Group owner cannot perform this operation");
  } else {
    await chat.removeUser(userId);
  }

  res.status(200).json({ msg: "You left the group" });
};

module.exports = {
  createChat,
  getSingleChat,
  getMyChats,
  deleteChat,
  leaveGroup,
  addGroupMember,
};
