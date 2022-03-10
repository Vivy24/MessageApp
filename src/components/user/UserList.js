import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserName from "./User";
import { filerDataByKey } from "../../services/helpers/user";
import { createNewChat } from "../../services/helpers/chat";
import { useNavigate } from "react-router-dom";
import { chatActions } from "../../store/chat-slice";
import {
  getDatabase,
  ref,
  onValue,
  query,
  orderByValue,
} from "firebase/database";

const UserList = () => {
  const [users, setUsersList] = useState([]);
  const [start, setStart] = useState(false);
  const userStore = useSelector((state) => state.user);

  const navigate = useNavigate();

  const db = getDatabase();

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

  const createOrRenderChat = (destinationUID) => {
    const queryChat = async () => {
      const findChat = query(ref(db, "chats"), orderByValue("members"));
      let found = false;
      await onValue(findChat, (snapshot) => {
        setStart(true);
        snapshot.forEach((value) => {
          const childKey = value.key;
          const childData = value.val();

          if (
            (childData.members[0] === userStore.userID &&
              childData.members[1] === destinationUID) ||
            (childData.members[0] === destinationUID &&
              childData.members[1] === userStore.userID)
          ) {
            // get the matched key
            found = true;
            navigate(`/chat/${childKey}`);
            return;
          }
        });
      });

      return found;
    };
    queryChat().then(async (response) => {
      if (!response && start) {
        console.log("Creating");
        let chatID = await createNewChat(userStore.userID, destinationUID);

        navigate(`/chat/${chatID}`);
      }
    });
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
