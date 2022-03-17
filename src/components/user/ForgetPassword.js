import { useState } from "react";
import { useValidInput } from "../../hooks/useValidInput";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgetPassword = () => {
  const [message, setMessage] = useState("");

  const {
    value: enteredEmail,
    empty: emailEmpty,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useValidInput();

  const submitHandler = async (event) => {
    event.preventDefault();

    if (emailEmpty) {
      return;
    }

    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, enteredEmail).then(() => {
        setMessage("Already sent. Please check your email!");
      });
    } catch (error) {
      setMessage(error.message);
    }
    resetEmail();
  };

  return (
    <form
      onSubmit={submitHandler}
      className="my-20 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm w-full max-w-xs container"
    >
      {message && <p className="block text-red-500 text-sm mb-2">{message}</p>}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          for="email"
        >
          Email
        </label>

        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="example@gmail.com"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Send Reset Password To Email
        </button>
      </div>
    </form>
  );
};

export default ForgetPassword;
