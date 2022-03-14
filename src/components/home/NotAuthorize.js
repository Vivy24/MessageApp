import { NavLink } from "react-router-dom";

const NotAuthorize = () => {
  return (
    <div className="w-full max-w-s container my-40 ">
      <h1 className="text-5xl text-center ">ReactFire Chat App</h1>
      <h6 className="text-2xl text-center mt-4">
        Where you can chat and connect to your friend
      </h6>
      <div className="flex justify-center mt-10">
        <button className="h-12 px-6 m-2 text-lg text-blue-100 transition-colors duration-150 bg-blue-500 rounded-lg focus:shadow-outline hover:bg-blue-800">
          <NavLink to="/login">Login</NavLink>
        </button>

        <button className="h-12 px-6 m-2 text-lg text-blue-100 transition-colors duration-150 bg-blue-500 rounded-lg focus:shadow-outline hover:bg-blue-800">
          <NavLink to="/register">Register</NavLink>
        </button>
      </div>
    </div>
  );
};

export default NotAuthorize;
