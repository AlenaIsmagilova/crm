import React from 'react';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import CreateUser from './pages/create-user/create-user';
import SignIn from './pages/signin/signin';
import SignUp from './pages/signup/signup';
import Profile from './pages/profile/profile';
import Loader from './components/loader';
import { getUser } from './utils/api/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (token) {
      setLoader(true);
      getUser()
        .then((data) => {
          setIsLoggedIn(true);
          setCurrentUser(data);
        })
        .catch((err) => {
          setIsLoggedIn(false);
          setCurrentUser(null);
          localStorage.removeItem('access_token');
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
            path='/signin'
            element={
              <SignIn
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
          <Route
            path='/signup/:username'
            element={
              <SignUp
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path='/'
            element={
              <Profile
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route path='/create-new-user' element={<CreateUser />} />
        </Routes>
      )}
    </>
  );
}

export default App;
