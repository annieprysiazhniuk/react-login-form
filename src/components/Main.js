import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Quote from "./Quote";

function Main({ isFormDisabled, onUserLogin }) {
  return (
    <>
      <main className="site-main">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <Switch>
                <Route path="/signup">
                  <Signup
                    isFormDisabled={isFormDisabled}
                    onUserLogin={onUserLogin}
                  />
                </Route>
                <Route path="/quote">
                  <Quote />
                </Route>
                <Route path="/">
                  <Login
                    isFormDisabled={isFormDisabled}
                    onUserLogin={onUserLogin}
                  />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Main;
