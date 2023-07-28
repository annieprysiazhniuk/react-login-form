import React from "react";

function ButtonLogOutLogIn({ onHandleHeaderButtons, isFormDisabled }) {
  if (isFormDisabled) {
    return (
      <>
        <button
          className="main-btn log-out-btn"
          onClick={() => {
            onHandleHeaderButtons();
          }}
        >
          Sign out
        </button>
      </>
    );
  } else {
    return (
      <>
        <a href="/" className="main-btn sign-in-btn">
          Log in
        </a>
      </>
    );
  }
}

export default ButtonLogOutLogIn;
