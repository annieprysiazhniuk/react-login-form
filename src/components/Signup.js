import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";

import {
  auth,
  createUserWithEmailAndPassword,
  db,
  ref,
  set,
} from "../modules/firebase.js";
import { changeDataFormat } from "../modules/changeDataFormat.js";
import { showErrorMessage } from "../modules/userSignInValidation.js";

import InputField from "./InputField";

function Signup({ isFormDisabled, onUserLogin }) {
  const history = useHistory();
  const errorMessageRef = useRef(null);
  const [validation, setValidation] = useState("");

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const handleChangeForm = ({ target }) => {
    const { name, value } = target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [startDate, setStartDate] = useState(new Date());
  const handleChangeBirthday = (date) => setStartDate(date);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const birthday = changeDataFormat(startDate);
    const { email, password, firstName, lastName } = formState;

    const userData = {
      firstName,
      lastName,
      birthday,
    };

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem("birthday", birthday);
        localStorage.setItem("userName", firstName);
        localStorage.setItem("signedIn", "signedIn");

        set(ref(db, "users/" + userCredential.user.uid), userData).then(() => {
          onUserLogin(true); //set User State to Logged in
          history.push("/quote");
        });
      })
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode === "auth/email-already-in-use") {
          setValidation(
            "Email already in use, Please use another emain or Sign in"
          );
        }
      });
  };

  return (
    <div className="form-container">
      <h1 className="section-title text-center fst-italic">
        Sign Up
        {showErrorMessage(
          "To create a new account, please Sign out first",
          errorMessageRef.current,
          isFormDisabled
        )}
      </h1>
      <p className="validation">{validation}</p>
      <form
        action=""
        className="p-3 rounded-3 m-5 shadow"
        onSubmit={handleFormSubmit}
      >
        <div className="mb-3 email-container">
          <InputField
            isFormDisabled={isFormDisabled}
            label="Email:"
            htmlFor="signup-email"
            value={formState.email}
            onChange={handleChangeForm}
            className="form-control"
            id="signup-email"
            size="50"
            type="email"
            name="email"
            required
          />
        </div>
        <div className="mb-3">
          <InputField
            isFormDisabled={isFormDisabled}
            label="Password:"
            htmlFor="password"
            value={formState.password}
            onChange={handleChangeForm}
            className="form-control"
            type="password"
            size="50"
            id="password"
            name="password"
            required
          />
        </div>

        <div className="d-flex justify-content-between">
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <InputField
                  isFormDisabled={isFormDisabled}
                  label="First name:"
                  htmlFor="name"
                  value={formState.firstName}
                  onChange={handleChangeForm}
                  className="form-control"
                  type="text"
                  id="name"
                  name="firstName"
                  required
                />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <InputField
                  isFormDisabled={isFormDisabled}
                  label="Last name:"
                  htmlFor="surname"
                  value={formState.lastName}
                  onChange={handleChangeForm}
                  className="form-control"
                  type="text"
                  id="surname"
                  name="lastName"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-3 birthday">
          <label className="form-label" htmlFor="datepicker">
            Day of Birth:
          </label>
          <div className="d-flex form-group mb-4 datepicker-container">
            <DatePicker
              selected={startDate}
              onChange={handleChangeBirthday}
              maxDate={addDays(new Date(), 0)}
              disabled={isFormDisabled}
            />
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn main-btn"
            type="submit"
            id="submit"
            disabled={isFormDisabled}
          >
            Sign up
          </button>
        </div>
      </form>

      <p className="text-center">
        Already have an account?
        <Link to="/" className="accent">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default Signup;
