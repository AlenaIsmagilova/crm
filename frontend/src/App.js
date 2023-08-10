import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { getCookie } from "./helpers";
import SignIn from "./pages/signin/signin";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const cookie = getCookie("access_token");

  if (cookie) {
    setIsLoggedIn(true);
  }

  return (
    <Routes>
      <Route
        path="/signin"
        element={<SignIn isLoggedIn={isLoggedIn} />}
      ></Route>
    </Routes>
  );
}

export default App;
