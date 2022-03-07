import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatID: "",
  },
  reducers: {
    getChatID(state, action) {
      state.chatID = action.payload.chatID;
      console.log(action.payload.chatID);
    },
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice;
