import NoChat from "../components/home/chat/NoChat";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import style from "./ChatPage.module.css";
import { useRef } from "react";
import Chat from "../components/home/chat/Chat";

const ChatPage = (props) => {
  const { height, width } = useWindowDimensions();
  const ref = useRef(null);

  const sendAMessage = (event) => {
    event.preventDefault();
    console.log(ref.current.innerText);
  };

  return (
    <div className="flex flex-col h-full justify-center items-center">
      <div className="mb-auto flex-grow bg-yellow-200">
        {props.chatID ? <Chat chatID={props.chatID} /> : <NoChat />}
      </div>

      <form onSubmit={sendAMessage} className=" flex w-full h-fit bg-blue-500">
        {<span ref={ref} className={style.textarea} contentEditable></span>}

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
