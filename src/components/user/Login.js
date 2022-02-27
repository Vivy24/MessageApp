import { useValidInput } from "../../hooks/useValidInput";

const Login = () => {
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

  const submitHandler = (event) => {
    event.preventDefault();
    if (emailEmpty) {
      return;
    }

    resetEmail();
    resetPassword();
  };
  return (
    <div className="w-full max-w-xs container my-20">
      <h1 className="font-bold text-2xl text-center text-blue-500 mb-3">
        Login
      </h1>

      <form
        onSubmit={submitHandler}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
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
