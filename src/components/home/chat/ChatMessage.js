import style from "./ChatMessageStyle.module.css";

const ChatMessage = (props) => {
  return (
    <div>
      <p
        className={
          !props.last
            ? props.sending
              ? style["from-me"]
              : style["from-them"]
            : props.sending
            ? `${style["from-me"]} ${style.lastChild}`
            : `${style["from-them"]} ${style.lastChild}`
        }
      >
        {props.content}
      </p>
    </div>
  );
};

export default ChatMessage;
