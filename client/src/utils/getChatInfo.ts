// Types
import { IChat } from "../model/chat";
import { IUser } from "../model/user";

export const getChatInfo = (chat: IChat, user: IUser) => {
  /*
    This function gets a chat and a user and returns a name, the chat last message, members and image for the chat
    It check if the chat is a private / group chat. 
    It also checks If it's a private chat,it also checks if it belong to the current user.
   */
  if (!user) {
    return { name: chat.name, image: "", lastmessage: "", members: [] };
  }

  let lastmessage = "";
  if (chat.messages && chat.messages.length > 0) {
    lastmessage = chat.messages[chat.messages.length - 1].text;
    if (lastmessage.length > 20) {
      lastmessage = lastmessage.substring(0, 20) + "...";
    }
  }

  let members: IUser[] = chat.users;

  if (chat.chatType === "private") {
    const isMyChat =
      chat.createdBy === user.userId && chat.members.length === 1;
    if (isMyChat) {
      const currentUser = members.filter(
        (chatUser) => chatUser.id === user.userId
      )[0];

      return {
        name: chat?.name || "Me(You)",
        image: currentUser.avatar,
        lastmessage,
        members,
      };
    } else {
      const chatPartner = chat.users.filter(
        (chatUser) => chatUser.id !== user.userId
      )[0];

      return {
        name: chatPartner.name,
        image: chatPartner.avatar,
        lastmessage,
        members,
      };
    }
  } else {
    return {
      name: chat?.name || "Group " + chat.id, // Add a default group image
      image: "/group.png",
      lastmessage,
      members,
    };
  }
};
