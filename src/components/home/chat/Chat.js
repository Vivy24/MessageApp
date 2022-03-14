import ChatMessage from "./ChatMessage";

import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

const Chat = () => {
  const [sender, setSenderName] = useState("");
  const [receiver, setReceiverName] = useState("");
  const chat = useSelector((state) => state.chat);

  const user = useSelector((state) => state.user);

  const db = getDatabase();

  const scrollTobottom = useRef(null);

  useEffect(() => {
    const senderRef = ref(db, "users/" + user.userID);
    scrollTobottom.current.scrollIntoView({ behavior: "smooth" });
    onValue(senderRef, (snapshot) => {
      const data = snapshot.val();
      setSenderName(data.displayName);
    });

    if (chat.members) {
      const receiverUID = chat.members.filter((uid) => {
        return uid !== user.userID;
      });

      const receiverRef = ref(db, "users/" + receiverUID);
      onValue(receiverRef, (snapshot) => {
        const data = snapshot.val();
        setReceiverName(data.displayName);
      });
    }
  }, []);

  return (
    <div
      style={{
        maxHeight: "200px",
        margin: "0 auto 1rem",
        maxWidth: "1500px",
        padding: "0.10rem 0.75rem",
      }}
    >
      {chat.members &&
        chat.messages.map((message, index) => {
          const messageSender =
            message.senderID === user.userID ? sender : receiver;
          let sending = user.userID === message.senderID;
          let last = index === chat.messages.length - 1;
          return (
            <ChatMessage
              key={Math.random()}
              senderName={messageSender}
              content={message.content}
              sending={sending}
              last={last}
            />
          );
        })}
      <div style={{ height: "10px" }} ref={scrollTobottom}></div>
    </div>
  );
};

export default Chat;
