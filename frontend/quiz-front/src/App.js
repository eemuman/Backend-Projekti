import Main from "./Pages/Main";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Admin from "./Pages/Admin";
import SignIn from "./Pages/SignIn";
import React, { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const RequireAuth = ({ children, redirectTo }) => {
    console.log(isLoggedIn);
    return isLoggedIn ? children : <Navigate to={redirectTo} />;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Play" element={<Main />} />

        <Route
          path="/Admin"
          element={
            <RequireAuth redirectTo="/SignIn">
              <Admin />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
