import style from "./ChatMessageStyle.module.css";

const ChatMessage = (props) => {
  return (
    <div>
      <p
        className={
          !props.last
            ? props.sending
              ? style["from-me"]
              : `${style["from-them"]} ${style.lastChild} ${style.lastChildFromThem}`
            : props.sending
            ? `${style["from-me"]} ${style.lastChild} ${style.lastChildFromMe}`
            : `${style["from-them"]} `
        }
      >
        {props.content}
      </p>
    </div>
  );
};

export default ChatMessage;
