import NoChat from "./chat/NoChat";
import UserList from "../user/UserList";

const Authorize = () => {
  return (
    <div className="flex w-full">
      <div className=" w-1/5 ">
        <UserList />
      </div>

      <div className="bg-slate-300 w-1"></div>
      <div className="w-4/5">
        <NoChat />
      </div>
    </div>
  );
};

export default Authorize;
