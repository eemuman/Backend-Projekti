import Main from "./Pages/Main";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Admin from "./Pages/Admin";
import SignIn from "./Pages/SignIn";
import React, { useState, useEffect } from "react";
import { checkLogin } from "./Utils/AxiosUtils";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const checkStatus = async () => {
    const resp = await checkLogin();
    resp === 200 ? setIsLoggedIn(true) : setIsLoggedIn(false);
  };
  useEffect(() => {
    checkStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn !== undefined) {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  const RequireAuth = ({ children, redirectTo }) => {
    return isLoggedIn ? children : <Navigate to={redirectTo} />;
  };

  if (isLoading) {
    return <div>LOADING...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <SignIn setLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            }
          />
          <Route
            path="/SignIn"
            element={
              <SignIn setLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            }
          />
          <Route path="/Play" element={<Main />} />

          <Route
            path="/Admin"
            element={
              <RequireAuth redirectTo="/SignIn">
                <Admin setLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
