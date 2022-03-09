/* eslint-disable no-restricted-globals */

import { getDatabase, ref, push } from "firebase/database";
import { Timestamp } from "firebase/firestore";

const db = getDatabase();

export const createNewChat = async (senderUID, destinationUID) => {
  const results = await push(ref(db, "chats/"), {
    members: [senderUID, destinationUID],
    messages: [],
    created: Timestamp.now().seconds,
  });

  return results.key;
};
