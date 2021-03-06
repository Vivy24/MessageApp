import Login from "../components/user/Login";
import NavBar from "../components/NavBar";

const LoginPage = () => {
  return (
    <div className="h-screen">
      <div>
        <NavBar auth={false} />
      </div>
      <div>
        <Login />;
      </div>
    </div>
  );
};

export default LoginPage;
