import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userID: "",
    recentChats: [],
  },
  reducers: {
    getUserID(state, action) {
      state.userID = action.payload.userID;
    },
    setMostRecentChat(state, action) {
      state.recentChats = action.payload.chats;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
