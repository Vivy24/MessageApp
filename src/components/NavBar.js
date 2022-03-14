import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Fragment } from "react";

const NavBar = (props) => {
  const auth = getAuth();
  const navigate = useNavigate();

  const logOutHandler = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {});
  };
  return (
    <nav className="flex items-center justify-between flex-wrap bg-slate-700 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <NavLink className="font-semibold text-2xl tracking-tight" to="/">
          Chat
        </NavLink>
      </div>
      {/* <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div> */}
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-lg lg:flex-grow ">
          {props.auth ? (
            <button
              onClick={logOutHandler}
              className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white"
            >
              Logout
            </button>
          ) : (
            <Fragment>
              <NavLink
                className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
                to="/login"
              >
                Login
              </NavLink>
              <NavLink
                className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
                to="/register"
              >
                Register
              </NavLink>
            </Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
