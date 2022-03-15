import { useValidInput } from "../../hooks/useValidInput";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();

  const {
    value: enteredEmail,
    empty: emailEmpty,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useValidInput();

  const {
    value: enteredPassword,
    empty: passwordEmpty,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordInputBlurHandler,
    reset: resetPassword,
  } = useValidInput();

  const submitHandler = async (event) => {
    event.preventDefault();
    if (emailEmpty || passwordEmpty) {
      return;
    }

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword
      ).then((userCredential) => {
        // signed in
        const user = userCredential.user;

        navigate("/");
      });
    } catch (error) {
      const loginError = {
        code: error.code,
        message: error.message,
      };

      setError(loginError);
    }

    resetEmail();
    resetPassword();
  };
  return (
    <div className="w-full max-w-xs container my-20">
      <h1 className="font-bold text-2xl text-center text-slate-700 mb-3">
        Login
      </h1>

      <form
        onSubmit={submitHandler}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {error && (
          <p className="block text-red-500 text-sm mb-2">{error.message}</p>
        )}
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
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordInputBlurHandler}
          />
          <p className="text-red-500 text-xs italic">
            {emailEmpty && "Please enter an email"}
            {passwordEmpty && "Please enter a password"}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-slate-700 hover:text-slate-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
