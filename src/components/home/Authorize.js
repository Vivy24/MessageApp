import ChatPage from "../../pages/ChatPage";
import UserList from "../user/UserList";

const Authorize = (props) => {
  return (
    <div className="flex w-full ">
      <div className=" w-1/5 " style={{ maxWidth: "200px" }}>
        <UserList />
      </div>

      <div className="bg-slate-300 w-1"></div>
      <div className="w-4/5 grow">
        <ChatPage chatID={props.chatID} />
      </div>
    </div>
  );
};

export default Authorize;
