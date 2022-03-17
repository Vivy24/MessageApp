const UserName = (props) => {
  const clickToRenderChat = () => {
    props.createChat(props.id);
  };

  return (
    <button className="block" value={props.id} onClick={clickToRenderChat}>
      <p className="text-left">{props.name}</p>

      <p className="font-light italic">{props.email}</p>
    </button>
  );
};

export default UserName;
