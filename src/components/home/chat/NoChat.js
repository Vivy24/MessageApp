import { useValidInput } from "../../../hooks/useValidInput";

const NoChat = () => {
  const {
    value: receiverEmail,
    empty: receiverEmailEmpty,
    valueChangeHandler: receiverChangeHandler,
    inputBlurHandler: receiverBlurHandler,
    reset: receiverReset,
  } = useValidInput(() => {});

  const createChatHandler = (event) => {
    event.preventDefault();

    if (receiverEmailEmpty) {
      return;
    }
    receiverReset();
  };

  return (
    <div>
      <h3 className="text-2xl text-center mt-20">No chat available</h3>
    </div>
  );
};

export default NoChat;
