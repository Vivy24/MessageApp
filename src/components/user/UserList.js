import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserName from "./User";
import { filerDataByKey } from "../../services/helpers/user";
import { createNewChat } from "../../services/helpers/chat";
import { useNavigate } from "react-router-dom";
import ExistUser from "./ExistUser";
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
  const [existChats, setExistChats] = useState([]);
  const userStore = useSelector((state) => state.user);

  const navigate = useNavigate();

  const db = getDatabase();

  const handleSearching = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const queryChat = async () => {
      const findChat = query(ref(db, "chats"), orderByValue("members"));

      await onValue(findChat, (snapshot) => {
        let sortedchat = [];
        const chatList = [];
        snapshot.forEach((value) => {
          const childKey = value.key;
          const childData = value.val();

          if (
            childData.members[0] === userStore.userID ||
            childData.members[1] === userStore.userID
          ) {
            const chat = {
              id: childKey,
              ...childData,
            };
            chatList.push(chat);
          }
        });

        sortedchat = chatList.sort((chat1, chat2) => {
          return parseFloat(chat2.created) - parseFloat(chat1.created);
        });

        setExistChats(sortedchat);
      });
    };

    queryChat();
  }, []);

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
        let chatID = await createNewChat(userStore.userID, destinationUID);

        navigate(`/chat/${chatID}`);
      }
    });
  };

  return (
    <Fragment>
      <form
        onSubmit={handleSearching}
        className="inline-flex w-full outline outline-gray-500 outline-1 h-7 mb-1.5 bg-white text-slate-700"
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

      <div className="relative z-0">
        {existChats.length !== 0 &&
          existChats.map((chat) => {
            return (
              <ExistUser
                key={chat.id}
                id={chat.id}
                lastMessage={chat.lastMessage}
                members={chat.members}
              />
            );
          })}

        {users.length !== 0 && (
          <div
            id="dropdown"
            className="absolute pt-1 inset-0 user z-20 h-fit pb-3 shadow-lg  divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 z-10"
            style={{
              backgroundColor: "#e5e5ea",
            }}
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
      </div>
    </Fragment>
  );
};

export default UserList;
