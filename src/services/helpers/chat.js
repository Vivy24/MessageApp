/* eslint-disable no-restricted-globals */
import {
  getDatabase,
  ref,
  push,
  orderByChild,
  orderByValue,
  query,
  equalTo,
  onValue,
} from "firebase/database";
import { setDoc, Timestamp } from "firebase/firestore";

const db = getDatabase();

export const createNewChat = async (senderUID, destinationUID) => {
  const results = await push(ref(db, "chats/"), {
    members: [senderUID, destinationUID],
    messages: [],
    created: Timestamp.now().seconds,
  });

  return results.key;
};

export const checkExistChat = (senderUID, destinationUID) => {
  const findChat = query(ref(db, "chats"), orderByValue("members"));
  let foundID;

  onValue(findChat, (snapshot) => {
    snapshot.forEach((value) => {
      const childKey = value.key;
      const childData = value.val();

      if (
        (childData.members[0] === senderUID &&
          childData.members[1] === destinationUID) ||
        (childData.members[0] === destinationUID &&
          childData.members[1] === senderUID)
      ) {
        // get the matched key
        foundID = childKey;
        return;
      }
    });
  });

  return foundID;
};

export const queryChatByID = (chatID) => {
  let chatObj;
  const chatRef = ref(db, "chats/" + chatID);
  onValue(chatRef, (snapshot) => {
    const data = snapshot.val();

    const chat = {
      members: data.members,
      message: data.message,
    };

    chatObj = chat;
  });

  return chatObj;
};

export const addMessage = (chatID, message) => {
  const chatRef = ref(db, "chats" + chatID);

  chatRef.messages.push(message);
};
