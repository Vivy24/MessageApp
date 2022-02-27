import NotAuthorize from "../components/home/NotAuthorize";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Authorize from "../components/home/Authorize";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      }
    });
  }, []);

  return isLoggedIn ? <Authorize /> : <NotAuthorize />;
};

export default HomePage;
