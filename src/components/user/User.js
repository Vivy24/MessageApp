const UserName = (props) => {
  const clickToRenderChat = (value) => {
    // id of the user: value.target.value;
    // need to render chat or create chat if there is none
  };

  return (
    <button className="block" value={props.id} onClick={clickToRenderChat}>
      {props.name}
    </button>
  );
};

export default UserName;
