import Register from "../components/user/Register";
import { Fragment } from "react";
import NavBar from "../components/NavBar";

const RegisterPage = () => {
  return (
    <div className="h-screen">
      <div>
        <NavBar auth={false} />
      </div>
      <div>
        <Register />;
      </div>
    </div>
  );
};

export default RegisterPage;
