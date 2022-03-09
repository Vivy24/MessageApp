import { useEffect, useState } from "react";
import { queryChatByID } from "../../../store/chat-action";

import { getMessage } from "../../../services/helpers/message";
import { useSelector } from "react-redux";

const Chat = (props) => {
  const [chat, setChat] = useState("");
  const chatStore = useSelector((state) => state.chat);

  console.log(chatStore);
  return <div>{chatStore && <h2>{chatStore.chatID}</h2>}</div>;
};

export default Chat;
