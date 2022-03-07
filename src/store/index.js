import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./user-slice";
import chatSlice from "./chat-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    chat: chatSlice.reducer,
  },
});

export default store;
