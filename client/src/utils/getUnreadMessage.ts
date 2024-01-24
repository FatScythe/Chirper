import { IUser } from "../model/user";
import { IChat } from "../model/chat";

const getUnreadMessage = (chat: IChat, user: IUser): number => {
  /*
      // DANGER- Needs Improvement, and i do not want to make multiple patch calls to the server when a message is read
      *****
      This fn takes the current chat and gets it copy in the local storage
      returns the difference btw the live chat and local storage chat 
    */

  if (localStorage.getItem("chats")) {
    let myLocalChats: IChat[] = JSON.parse(
      localStorage.getItem("chats") || "[]"
    );
    myLocalChats = myLocalChats.filter(
      (singleChat) => chat.id === singleChat.id
    );

    let chatMessages = myLocalChats[0]?.messages;

    if (chat && chat.messages && chat.messages.length > 0) {
      // If no local storage chat messages but database message(s) exist
      if (chatMessages && chatMessages.length === 0) {
        // Returns all database message count that does not belong to the current user
        return chat.messages.filter((message) => message.sender !== user.userId)
          .length;
      }

      const lastMessage = chat.messages[chat.messages.length - 1];
      // if the database lastmessage is in the local storage already
      if (
        chatMessages?.filter((msg) => msg.id === lastMessage.id).length === 1
      ) {
        return 0;
      }

      // If the database lastmessage belongs to the current user then, they couldn't have unread messages
      if (lastMessage.sender === user.userId) {
        return 0;
      }
    } else {
      // No database messages
      return 0;
    }

    if (chatMessages && chatMessages.length > 0 && chat.messages) {
      let messageDiff = chat.messages.length - chatMessages.length;

      return Math.abs(messageDiff);
    }
  }

  return 0;
};

export default getUnreadMessage;
