import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import UserName from "./User";

import { filerDataByKey } from "../../services/helpers/user";
import { createNewChat, checkExistChat } from "../../services/helpers/chat";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsersList] = useState([]);
  const userStore = useSelector((state) => state.user);
  const chatStore = useSelector((state) => state.chat);
  const navigate = useNavigate();

  const handleSearching = (event) => {
    event.preventDefault();
  };

  const handleChange = async (input) => {
    const value = input.target.value;
    if (value) {
      try {
        const userList = await filerDataByKey("displayName", value);
        const filterUserList = userList.filter((user) => {
          return user.id !== userStore.userID;
        });
        setUsersList(filterUserList);
      } catch (error) {
        console.log(error);
      }
    } else {
      setUsersList([]);
    }
  };

  const createOrRenderChat = async (destinationUID) => {
    let existChatID = await checkExistChat(userStore.userID, destinationUID);
    if (!existChatID) {
      existChatID = await createNewChat(userStore.userID, destinationUID);
    }
    navigate(`/chat/${existChatID}`);
  };
  return (
    <Fragment>
      <form
        onSubmit={handleSearching}
        className="inline-flex w-full outline outline-gray-500 outline-1 "
      >
        <input
          className=" w-10/12"
          type="text"
          placeholder="Search"
          onChange={handleChange}
        ></input>
        <button className="ml-2 w-2/12" type="submit">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>

      {/* {// where to render message list}
      <div className >
        
        </div> */}

      {users.length !== 0 && (
        <div
          id="dropdown"
          className="user z-10 bg-black-500 shadow-lg  divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          {users.map((user) => {
            return (
              <UserName
                createChat={createOrRenderChat}
                name={user.info.displayName}
                key={user.id}
                id={user.id}
              />
            );
          })}
        </div>
      )}
    </Fragment>
  );
};

export default UserList;
