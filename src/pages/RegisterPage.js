import Register from "../components/user/Register";
import { Fragment } from "react";
import NavBar from "../components/NavBar";

const RegisterPage = () => {
  return (
    <Fragment>
      <div>
        <NavBar auth={false} />
      </div>
      <div className="flex flex-grow">
        <Register />;
      </div>
    </Fragment>
  );
};

export default RegisterPage;
