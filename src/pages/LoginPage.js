import Login from "../components/user/Login";
import { Fragment } from "react";
import NavBar from "../components/NavBar";

const LoginPage = () => {
  return (
    <Fragment>
      <div>
        <NavBar auth={false} />
      </div>
      <div className="flex flex-grow">
        <Login />;
      </div>
    </Fragment>
  );
};

export default LoginPage;
