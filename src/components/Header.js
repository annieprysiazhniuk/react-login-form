import React from "react";
import ButtonLogOutLogIn from "./ButtonLogOutLogIn";
import { auth, signOut } from "../modules/firebase";
import { useHistory } from "react-router-dom";
import checkUserAuthentication from "../modules/changeUserState";

function Header({ isFormDisabled, setIsFormDisabled }) {
  const history = useHistory();

  const handleHeaderButtons = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      const isUserLoggedIn = await checkUserAuthentication();
      setIsFormDisabled(isUserLoggedIn); // Update the state here

      console.log("HEADER isFormDisabled", isFormDisabled);

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="site-header">
      <div className="container">
        <nav className="navbar navbar-dark navbar-expand-lg main-nav-container row align-items-center">
          <div className="col-2">
            <a className="logo navbar-brand" href="/">
              LOGO
            </a>
          </div>
          <div className="col-lg-4 offset-lg-6 d-none d-lg-block">
            <div className="btn-container">
              <ButtonLogOutLogIn
                onHandleHeaderButtons={handleHeaderButtons}
                isFormDisabled={isFormDisabled}
              />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
