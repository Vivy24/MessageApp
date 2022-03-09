import { chatActions } from "./chat-slice";
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getDatabase,
  ref,
  orderByChild,
  equalTo,
  query,
  onValue,
} from "firebase/database";
import { filerDataByKey } from "../services/helpers/user";

const db = getDatabase();

// export const queryChatByID = (chatID) => {
//   return async (dispatch) => {

//     const chatRef = ref(db, "chats/" + chatID);
//     await onValue(chatRef, (snapshot) => {
//       const data = snapshot.val();

//       dispatch(
//         chatActions.saveChat({
//           chatID: chatID || "",
//           members: data.members,
//         })
//       );
//     });
//   };
// };

export const queryChatByID = createAsyncThunk(
  "chat/saveChatMembers",
  async (chatID) => {
    console.log("dadadwadwa");

    const chatRef = ref(db, "chats/" + chatID);

    return await onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      return {
        members: data.members,
        id: chatID,
      };
    });
  }
);

export const getMessage = (chatID) => {
  return async (dispatch) => {
    // const filterMessage = query(
    //   ref(db, "messages"),
    //   orderByChild("chatID"),
    //   equalTo(chatID)
    // );
    // await onValue(filterMessage, (snapshot) => {
    //   console.log("INSIDE");
    //   let sortedMessages = [];
    //   const messages = [];
    //   snapshot.forEach((value) => {
    //     const childData = value.val();
    //     const message = {
    //       content: childData.content,
    //       created: childData.created,
    //       receiverID: childData.receiverID,
    //       senderID: childData.senderID,
    //     };
    //     messages.push(message);
    //     console.log({ message });
    //   });
    //   sortedMessages = messages.sort(
    //     (message1, message2) =>
    //       parseFloat(message2.created) - parseFloat(message1.created)
    //   );
    //   console.log({ sortedMessages });
    //   dispatch(
    //     chatActions.saveMessage({
    //       messages: sortedMessages || [],
    //     })
    //   );
    // });
  };
};
