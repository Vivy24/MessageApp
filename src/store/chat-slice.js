import { createSlice } from "@reduxjs/toolkit";
import { queryChatByID } from "./chat-action";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatID: "",
    members: [],
    messages: [],
  },
  reducers: {
    saveChat(state, action) {
      state.chatID = action.payload.chatID;
      state.members = action.payload.members;
    },

    getChatID(state, action) {
      state.chatID = action.payload.chatID;
    },

    saveMembers(state, action) {
      state.members = action.payload.members;
    },

    saveMessage(state, action) {
      state.messages = action.payload.messages;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(queryChatByID.fulfilled, (state, action) => {
      state.members = action.payload.members;
      state.chatID = action.payload.chatID;
    });
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice;
