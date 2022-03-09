const ChatMessage = (props) => {
  return (
    <div
      style={{
        display: "block",
        marginLeft: "2px",
        backgroundColor: "gray",
        width: "fit-content",
      }}
    >
      <h5>{props.senderName}</h5>
      <p>{props.content}</p>
      <h2>{props.sending && <p>Is Sending</p>}</h2>
    </div>
  );
};

export default ChatMessage;
