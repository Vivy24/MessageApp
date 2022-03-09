/* eslint-disable no-restricted-globals */

import { faCropSimple } from "@fortawesome/free-solid-svg-icons";
import {
  getDatabase,
  ref,
  push,
  orderByValue,
  query,
  onValue,
} from "firebase/database";
import { setDoc, Timestamp } from "firebase/firestore";

import { useDispatch } from "react-redux";

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
