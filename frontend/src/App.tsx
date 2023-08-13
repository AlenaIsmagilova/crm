import React from "react";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateUser from "./pages/create-user/create-user";
import SignIn from "./pages/signin/signin";
import SignUp from "./pages/signup/signup";
import Profile from "./pages/profile/profile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token, isLoggedIn]);

  return (
    <Routes>
      <Route
        path="/signin"
        element={<SignIn isLoggedIn={isLoggedIn} />}
      ></Route>
      <Route path="/:username" element={<SignUp />} />
      <Route path="/" element={<CreateUser />} />
      <Route
        path="/users/me"
        element={<Profile setIsLoggedIn={setIsLoggedIn} />}
      />
    </Routes>
  );
}

export default App;
