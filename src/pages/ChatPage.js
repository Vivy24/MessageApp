import NoChat from "../components/home/chat/NoChat";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import style from "./ChatPage.module.css";
import { useEffect, useRef } from "react";
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
} from "firebase/database";

const ChatPage = (props) => {
  const { height, width } = useWindowDimensions();
  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);

  const db = getDatabase();
  const refer = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchChat = async (chatID) => {
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
            console.log({ message });
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
  }, []);

  const addMessage = async () => {
    const sender = user.userID;

    const receiver = chat.members.find((id) => {
      return id !== sender;
    });

    if (refer.current.innerText.length === 0) {
      return;
    }

    await addMessageToDB(
      sender,
      receiver,
      props.chatID,
      refer.current.innerText
    );

    // bad behavior
    refer.current.innerText = "";
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

  return (
    <div className="flex flex-col h-full justify-center items-center">
      <div className="mb-auto flex-grow bg-yellow-200 w-full">
        {props.chatID ? <Chat chatID={props.chatID} /> : <NoChat />}
      </div>

      <form onSubmit={sendAMessage} className=" flex w-full h-fit bg-blue-500">
        {
          <span
            onKeyUp={sendMessageBySpan}
            ref={refer}
            className={style.textarea}
            contentEditable
          ></span>
        }

        <button className="ml-2  " type="submit">
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
