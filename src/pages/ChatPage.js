import NoChat from "../components/home/chat/NoChat";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import style from "./ChatPage.module.css";
import { useRef } from "react";

const ChatPage = () => {
  const { height, width } = useWindowDimensions();
  const ref = useRef(null);

  const sendAMessage = (event) => {
    event.preventDefault();
    console.log(ref.current.innerText);
  };

  return (
    <div className="flex flex-col bg-red-200 h-full justify-center items-center">
      <div className="mb-auto flex-grow">
        <NoChat />
      </div>

      <form onSubmit={sendAMessage} className=" flex w-full h-fit bg-white">
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
