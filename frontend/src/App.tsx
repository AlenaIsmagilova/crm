import React from "react";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { getCookie } from "./helpers";
import CreateUser from "./pages/create-user/create-user";
import SignIn from "./pages/signin/signin";
import SignUp from "./pages/signup/signup";
import User from "./pages/user/user";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const cookie = getCookie("access_token");

  useEffect(() => {
    if (cookie) {
      setIsLoggedIn(true);
    }
  }, [cookie, isLoggedIn]);

  return (
    <Routes>
      <Route
        path="/signin"
        element={<SignIn isLoggedIn={isLoggedIn} />}
      ></Route>
      <Route path="/:username" element={<SignUp />} />
      <Route path="/" element={<CreateUser />} />
      <Route path="/users/me" element={<User />} />
    </Routes>
  );
}

export default App;
