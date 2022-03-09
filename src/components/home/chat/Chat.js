import ChatMessage from "./ChatMessage";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

const Chat = () => {
  const [sender, setSenderName] = useState("");
  const [receiver, serReceiverName] = useState("");
  const chat = useSelector((state) => state.chat);

  const user = useSelector((state) => state.user);

  const db = getDatabase();

  useEffect(() => {
    const senderRef = ref(db, "users/" + user.userID);
    onValue(senderRef, (snapshot) => {
      const data = snapshot.val();
      setSenderName(data.displayName);
    });

    const receiverUID = chat.members.filter((uid) => {
      return uid !== user.userID;
    });

    const receiverRef = ref(db, "users/" + receiverUID);
    onValue(receiverRef, (snapshot) => {
      const data = snapshot.val();
      serReceiverName(data.displayName);
    });
  }, [chat]);

  return (
    <div>
      {chat.members &&
        chat.messages.map((message) => {
          const messageSender =
            message.senderID == user.userID ? sender : receiver;
          let sending = user.userID == message.senderID;
          return (
            <ChatMessage
              key={Math.random()}
              senderName={messageSender}
              content={message.content}
              sending={sending}
            />
          );
        })}
    </div>
  );
};

export default Chat;
