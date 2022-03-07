import { useEffect, useState } from "react";
import { queryChatByID } from "../../../services/helpers/chat";

const Chat = (props) => {
  const [chat, setChat] = useState("");

  useEffect(() => {
    const chat = queryChatByID(props.chatID);

    setChat(chat);
  }, [props.chatID]);

  return <div>{chat.message ? "" : <h2>{props.chatID}</h2>}</div>;
};

export default Chat;
