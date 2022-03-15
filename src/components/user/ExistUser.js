import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ref, onValue, getDatabase } from "firebase/database";
import { useNavigate } from "react-router-dom";

const ExistUser = (props) => {
  const user = useSelector((state) => state.user);
  const [receiverName, setReceiverName] = useState("");

  const navigate = useNavigate();

  const db = getDatabase();
  useEffect(() => {
    if (props.members) {
      const receiverUID = props.members.filter((uid) => {
        return uid !== user.userID;
      });

      const receiverRef = ref(db, "users/" + receiverUID);
      onValue(receiverRef, (snapshot) => {
        const data = snapshot.val();
        setReceiverName(data.displayName);
      });
    }
  }, []);

  const renderChat = () => {
      
    navigate(`/chat/${props.id}`);
  };

  return (
    <button
      onClick={renderChat}
      className="w-full shadow-inner text-left bg-slate-700 text-white outline outline-slate-500 pb-3"
    >
      <p>{receiverName}</p>
      <p style={{ wordWrap: "break-word" }} className="text-xs	">
        {props.lastMessage}
      </p>
    </button>
  );
};

export default ExistUser;
