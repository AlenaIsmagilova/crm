import React from "react";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { getCookie } from "./helpers";
import CreateUser from "./pages/create-user/create-user";
import SignIn from "./pages/signin/signin";
import SignUp from "./pages/signup/signup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const cookie = getCookie("access_token");
  console.log(cookie, "this is cookie");

  useEffect(() => {
    if (cookie) {
      setIsLoggedIn(true);
    }
  }, [cookie]);

  return (
    <Routes>
      <Route
        path="/signin"
        element={<SignIn isLoggedIn={isLoggedIn} />}
      ></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/" element={<CreateUser />}></Route>
    </Routes>
  );
}

export default App;
