import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserList = () => {
  const handleSearching = (event) => {
    event.preventDefault();
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
