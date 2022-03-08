const Message = (props) => {
  return (
    <div>
      <p>{props.destName}</p>
      <p>{props.message}</p>
    </div>
  );
};

export default Message;
