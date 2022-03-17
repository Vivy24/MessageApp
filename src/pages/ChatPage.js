import NoChat from "../components/home/chat/NoChat";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import style from "./ChatPage.module.css";
import { useEffect, useRef, useState } from "react";
import Chat from "../components/home/chat/Chat";
import { useSelector, useDispatch } from "react-redux";
import { addMessageToDB } from "../services/helpers/message";
import { chatActions } from "../store/chat-slice";
import {
  getDatabase,
  onValue,
  ref,
  query,
  orderByChild,
  equalTo,
  update,
} from "firebase/database";

import { useNavigate } from "react-router-dom";

import { Timestamp } from "firebase/firestore";

import { useValidInput } from "../hooks/useValidInput";

const ChatPage = (props) => {
  const { height, width } = useWindowDimensions();
  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);

  const [message, setMessage] = useState();
  const [chatIDState, setChatID] = useState();

  const db = getDatabase();
  const refer = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    value: enteredMessage,
    empty: messageEmpty,
    valueChangeHandler: messageChangeHandler,
    inputBlurHandler: messageBlurHandler,
    reset: resetmessage,
  } = useValidInput(() => {});

  useEffect(() => {
    const fetchChat = async (chatID) => {
      const updatedChatID = async () => {
        await dispatch(
          chatActions.getChatID({
            chatID: chatID,
          })
        );
      };
      updatedChatID();
      const chatRef = ref(db, "chats/" + chatID);

      onValue(chatRef, (snapshot) => {
        const data = snapshot.val();
        dispatch(
          chatActions.saveMembers({
            members: data.members,
          })
        );

        const filterMessage = query(
          ref(db, "messages"),
          orderByChild("chatID"),
          equalTo(chatID)
        );

        onValue(filterMessage, (snapshot) => {
          let sortedMessages = [];
          const messages = [];
          snapshot.forEach((value) => {
            const childData = value.val();
            const message = {
              content: childData.content,
              created: childData.created,
              receiverID: childData.receiverID,
              senderID: childData.senderID,
            };
            messages.push(message);
          });
          sortedMessages = messages.sort(
            (message1, message2) =>
              parseFloat(message1.created) - parseFloat(message2.created)
          );
          dispatch(
            chatActions.saveMessage({
              messages: sortedMessages || [],
            })
          );
        });
      });
    };
    fetchChat(props.chatID);
  }, [props.chatID]);

  const addMessage = () => {
    const sender = user.userID;
    const receiver = chat.members.find((id) => {
      return id !== sender;
    });

    if (refer.current.innerText.length === 0) {
      return;
    }

    addMessageToDB(sender, receiver, chat.chatID, refer.current.innerText);
    // bad behavior
    update(ref(db, "chats/" + chat.chatID), {
      created: Timestamp.now().seconds,
      lastMessage: refer.current.innerText,
    });
    refer.current.innerText = "";
    navigate(`/chat/${chat.chatID}`);
  };

  const sendMessageBySpan = (event) => {
    if (event.keyCode === 13) {
      addMessage();
    }
  };

  const sendAMessage = (event) => {
    event.preventDefault();

    addMessage();
  };

  //  maxHeight: "80vh",
  return (
    <div className="flex flex-col h-full justify-center items-center">
      <div
        className="mb-auto w-full"
        style={{
          overflowY: "auto",
          flex: "1 1 auto",
        }}
      >
        {props.chatID ? <Chat chatID={props.chatID} /> : <NoChat />}
      </div>

      <form
        onSubmit={sendAMessage}
        style={{
          flex: "0 1 40px",
        }}
        className=" flex w-full h-fit bg-slate-700 text-black"
      >
        {
          <span
            onKeyUp={sendMessageBySpan}
            ref={refer}
            className={style.textarea}
            contentEditable
          ></span>
        }
        <button className="text-white">
          {width < 600 ? (
            <FontAwesomeIcon icon={faPaperPlane} />
          ) : (
            <p>
              Send <FontAwesomeIcon icon={faPaperPlane} />
            </p>
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
