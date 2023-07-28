import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import {
  auth,
  signInWithEmailAndPassword,
  db,
  ref,
  get,
  child,
} from "../modules/firebase";
import { showErrorMessage } from "../modules/userSignInValidation.js";

import InputField from "./InputField";

function Login({ isFormDisabled, onUserLogin }) {
  const history = useHistory();
  const errorMessageRef = useRef(null);

  const [validation, setValidation] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userKey = userCredential.user.uid;
        const dbRef = ref(db);

        get(child(dbRef, `users/${userKey}`)).then((snapshot) => {
          if (snapshot.exists()) {
            let birthday = snapshot.val().birthday;
            let userName = snapshot.val().firstName;

            localStorage.setItem("birthday", birthday);
            localStorage.setItem("userName", userName);
            localStorage.setItem("signedIn", "signedIn");

            onUserLogin(true); //set User State to Logged in

            history.push("/quote");
          } else {
            console.log("No data available");
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode === "auth/user-not-found") {
          setValidation("User not found, Please sign up first");
        } else if (errorCode === "auth/wrong-password") {
          setValidation("Wrong Password, Please try again");
        }
      });
  };

  return (
    <div className="form-container">
      <h1 className="section-title text-center fst-italic">
        Sign in
        {showErrorMessage(
          "To log in to a new account, please make sure to Sign out first",
          errorMessageRef.current,
          isFormDisabled
        )}
      </h1>
      <p className="validation">{validation}</p>
      <form
        action=""
        className="p-3 rounded-3 shadow m-5"
        onSubmit={handleFormSubmit}
      >
        <div className="mb-3 email-container">
          <InputField
            isFormDisabled={isFormDisabled}
            label="Email:"
            htmlFor="signup-email"
            value={email}
            onChange={handleChangeEmail}
            className="form-control"
            id="signup-email"
            size="50"
            type="email"
            name="email"
            required
          />
        </div>
        <div className="mb-3 password-container">
          <InputField
            isFormDisabled={isFormDisabled}
            label="Password:"
            htmlFor="password"
            value={password}
            onChange={handleChangePassword}
            className="form-control"
            type="password"
            size="50"
            id="password"
            name="password"
            required
          />
        </div>

        <div className="d-flex justify-content-end">
          <button
            disabled={isFormDisabled}
            className="btn main-btn"
            type="submit"
            id="submit"
          >
            Login
          </button>
        </div>
      </form>
      <p className="text-center">
        Don't have an account?
        <Link to="signup" className="accent">
          Create one
        </Link>
      </p>
    </div>
  );
}

export default Login;
