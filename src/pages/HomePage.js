import NotAuthorize from "../components/home/NotAuthorize";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Authorize from "../components/home/Authorize";
import { useState, useEffect, Fragment } from "react";
import NavBar from "../components/NavBar";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => {
      setIsLoggedIn();
    };
  }, []);

  return (
    <Fragment>
      <div>
        <NavBar auth={isLoggedIn} />
      </div>
      <div className="flex flex-grow">
        {isLoggedIn ? <Authorize /> : <NotAuthorize />}
      </div>
    </Fragment>
  );
};

export default HomePage;
