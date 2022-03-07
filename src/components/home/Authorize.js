import ChatPage from "../../pages/ChatPage";
import UserList from "../user/UserList";

import { useSelector } from "react-redux";

const Authorize = () => {
  const chatStore = useSelector((state) => state.chat);

  console.log(chatStore.chatID);

  return (
    <div className="flex w-full">
      <div className=" w-1/5 ">
        <UserList />
      </div>

      <div className="bg-slate-300 w-1"></div>
      <div className="w-4/5">
        <ChatPage chatID={chatStore.chatID} />
      </div>
    </div>
  );
};

export default Authorize;
