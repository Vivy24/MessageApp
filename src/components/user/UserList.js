import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, Fragment } from "react";
import UserName from "./User";

import { filerDataByKey } from "../../services/helpers/user";

const UserList = () => {
  const [users, setUsersList] = useState([]);
  const handleSearching = (event) => {
    event.preventDefault();
  };

  const handleChange = async (input) => {
    const value = input.target.value;
    if (value) {
      try {
        const userList = await filerDataByKey("displayName", value);
        setUsersList(userList);
      } catch (error) {
        console.log(error);
      }
    } else {
      setUsersList([]);
    }
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
              <li className="block">
                <UserName
                  name={user.info.displayName}
                  key={user.id}
                  id={user.id}
                />
              </li>
            );
          })}
        </div>
      )}
    </Fragment>
  );
};

export default UserList;
