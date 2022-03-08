import NoChat from "../components/home/chat/NoChat";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import style from "./ChatPage.module.css";
import { useRef } from "react";
import Chat from "../components/home/chat/Chat";
import { useSelector } from "react-redux";
import { queryChatByID } from "../services/helpers/chat";
import { addMessageToDB } from "../services/helpers/message";

const ChatPage = (props) => {
  const { height, width } = useWindowDimensions();
  const user = useSelector((state) => state.user);

  const ref = useRef(null);
  const addMessage = () => {
    const chat = queryChatByID(props.chatID);

    const sender = user.userID;

    const receiver = chat.members.find((id) => {
      return id !== sender;
    });

    if (ref.current.innerText.length === 0) {
      return;
    }

    addMessageToDB(sender, receiver, props.chatID, ref.current.innerText);

    // bad behavior
    ref.current.innerText = "";
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
      <div className="mb-auto flex-grow bg-yellow-200">
        {props.chatID ? <Chat chatID={props.chatID} /> : <NoChat />}
      </div>

      <form onSubmit={sendAMessage} className=" flex w-full h-fit bg-blue-500">
        {
          <span
            onKeyUp={sendMessageBySpan}
            ref={ref}
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
