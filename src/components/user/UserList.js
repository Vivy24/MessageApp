import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { fetchUserList } from "../../store/user-action";
import { listAllUsers } from "../../services/helpers/user";

const UserList = () => {
  const handleSearching = (event) => {
    event.preventDefault();
    console.log("12");
    listAllUsers();
  };
  return (
    <form
      onSubmit={handleSearching}
      className="inline-flex w-full outline outline-gray-500 outline-1"
    >
      <input className=" w-10/12" type="text" placeholder="Search"></input>
      <button className="ml-2 w-2/12" type="submit">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};

export default UserList;
