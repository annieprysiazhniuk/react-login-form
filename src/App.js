import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import checkUserAuthentication from "./modules/changeUserState";

import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  const [isFormDisabled, setIsFormDisabled] = useState(false); //use State to track if User logged in

  useEffect(() => {
    const checkAuthentication = async () => {
      const isUserLoggedIn = await checkUserAuthentication();
      setIsFormDisabled(isUserLoggedIn);
    };
    checkAuthentication();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header
          isFormDisabled={isFormDisabled}
          setIsFormDisabled={setIsFormDisabled}
        />
        <Main isFormDisabled={isFormDisabled} onUserLogin={setIsFormDisabled} />
      </div>
    </Router>
  );
}

export default App;
