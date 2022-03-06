import NotAuthorize from "../components/home/NotAuthorize";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Authorize from "../components/home/Authorize";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import { useParams } from "react-router-dom";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const dispatch = useDispatch();

  const params = useParams();

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          userActions.getUserID({
            userID: user.uid,
          })
        );
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
    <div className="flex flex-col h-screen">
      <div className="mb-1">
        <NavBar auth={isLoggedIn} />
      </div>
      <div className="flex flex-grow">
        {isLoggedIn ? <Authorize chatID={params.chatID} /> : <NotAuthorize />}
      </div>
    </div>
  );
};

export default HomePage;
