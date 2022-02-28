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
    <div className="">
      <h3 className="text-2xl text-center mt-20">
        No chat available, please enter the email you want to create chat with
      </h3>
      <form
        onSubmit={createChatHandler}
        className="w-full max-w-xs container mx-auto mt-5"
      >
        <label className="text-xl" for="email">
          Email:{" "}
        </label>
        <input
          name="email"
          value={receiverEmail}
          onChange={receiverChangeHandler}
          onBlur={receiverBlurHandler}
          className="outline outline-1"
          type="email"
          placeholder="Enter email here"
        ></input>
        <p className="block text-red-500 text-sm mb-2">
          {receiverEmailEmpty && "Email should not be empty"}
        </p>
        <button
          className="block h-8 px-8 mt-2 mx-auto rounded-full bg-blue-500 hover:bg-blue-700"
          type="submit"
        >
          Create Chat
        </button>
      </form>
    </div>
  );
};

export default NoChat;
