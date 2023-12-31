import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateUser from "./pages/create-user/create-user";
import SignIn from "./pages/signin/signin";
import SignUp from "./pages/signup/signup";
import Profile from "./pages/profile/profile";
import Loader from "./components/loader/loader";
import { getUserApi } from "./utils/api/api";
import Metrics from "./pages/metrics/metrics";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loader, setLoader] = useState(false);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      setLoader(true);
      getUserApi()
        .then((data) => {
          setIsLoggedIn(true);
          setCurrentUser(data);
        })
        .catch((err) => {
          setIsLoggedIn(false);
          setCurrentUser(null);
          localStorage.removeItem("access_token");
        })
        .finally(() => setLoader(false));
    }
  }, []);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <Routes>
          <Route
            path="/signin"
            element={
              <SignIn
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
          <Route
            path="/signup/:username"
            element={
              <SignUp
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/"
            element={
              <Profile
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route path="/create-new-user" element={<CreateUser />} />
          <Route
            path="/metrics"
            element={<Metrics isLoggedIn={isLoggedIn} />}
          />
        </Routes>
      )}
    </>
  );
}

export default App;
