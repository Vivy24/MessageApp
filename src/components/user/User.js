const UserName = (props) => {
  const clickToRenderChat = (value) => {
    props.createChat(value.target.value);
  };
  console.log(props.name);

  return (
    <button className="block " value={props.id} onClick={clickToRenderChat}>
      {props.name}
    </button>
  );
};

export default UserName;
