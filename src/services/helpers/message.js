import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, push } from "firebase/database";

import { setDoc, Timestamp } from "firebase/firestore";

const db = getDatabase();

export const addMessageToDB = async (senderID, receiverID, chatID, content) => {
  try {
    await push(ref(db, "messages/"), {
      content: content,
      senderID: senderID,
      receiverID: receiverID,
      chatID: chatID,
      created: Timestamp.now().seconds,
    });
  } catch (error) {
    // handling error here
  }
};
