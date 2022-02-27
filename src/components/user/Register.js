import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { useValidInput } from "../../hooks/useValidInput";

const Register = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();

  const {
    value: enteredUsername,
    empty: enteredUserEmpty,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsername,
  } = useValidInput((value) => {
    return value.length > 4;
  });
  const {
    value: enteredEmail,
    empty: emailEmpty,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useValidInput((email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  });

  const {
    value: enteredPassword,
    hasError: passwordHasError,
    empty: passwordEmpty,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useValidInput((password) => {
    return /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/.test(
      password
    );
  });

  const {
    value: enteredCPassword,
    hasError: cPasswordHasError,
    empty: cPasswordEmpty,
    valueChangeHandler: cPasswordChangeHandler,
    inputBlurHandler: cPasswordBlurHandler,
    reset: resetCPassword,
  } = useValidInput((cPassword) => {
    return cPassword === enteredPassword;
  });

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      emailEmpty ||
      enteredUserEmpty ||
      passwordEmpty ||
      cPasswordEmpty ||
      usernameHasError ||
      emailHasError ||
      passwordHasError ||
      cPasswordHasError
    ) {
      return;
    }

    try {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, enteredEmail, enteredCPassword).then(
        async () => {
          await updateProfile(auth.currentUser, {
            displayName: enteredUsername,
          });
          navigate("/");
        }
      );
    } catch (error) {
      const registerError = {
        code: error.code,
        message: error.message,
      };

      setError(registerError);
    }
    resetUsername();
    resetEmail();
    resetPassword();
    resetCPassword();
  };

  return (
    <div className="w-full max-w-xs container my-20">
      <h1 className="font-bold text-2xl text-center text-blue-500 mb-3">
        Register
      </h1>

      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={submitHandler}
      >
        {error && (
          <p className="block text-red-500 text-sm mb-2">{error.message}</p>
        )}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Username <span className="text-red-500">*</span>
          </label>

          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="example123"
            value={enteredUsername}
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
          />

          <p className="text-red-500 text-xs italic">
            {usernameHasError &&
              !enteredUserEmpty &&
              "Username must be greater than 4 letters"}
            {enteredUserEmpty && "Please enter username"}
          </p>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="email"
          >
            Email <span className="text-red-500">*</span>
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

          <p className="text-red-500 text-xs italic">
            {emailHasError && !emailEmpty && "Invalid email"}
            {emailEmpty && "Please enter email"}
          </p>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <input
            className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />

          <p className="text-white-300 text-xs italic">
            More than 8 characters, including one uppercase letter, one
            lowercase letter, one number and special character
          </p>
          <p className="text-red-500 text-xs italic">
            {passwordHasError && !passwordEmpty && "Invalid password"}
            {passwordEmpty && "Please enter password"}
          </p>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="cpassword"
          >
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="cpassword"
            type="password"
            placeholder="******************"
            value={enteredCPassword}
            onChange={cPasswordChangeHandler}
            onBlur={cPasswordBlurHandler}
          />

          <p className="text-red-500 text-xs italic">
            {cPasswordHasError &&
              !cPasswordEmpty &&
              "Pasword and Confirm Password does not match"}
            {cPasswordEmpty && "Please confirm password"}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
