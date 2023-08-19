import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../helpers/types";
import { signInApi } from "../../utils/api/api";
import styles from "./signin.module.css";

interface ISignInProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setCurrentUser: Dispatch<SetStateAction<IUser>>;
}

const SignIn = ({
  isLoggedIn,
  setIsLoggedIn,
  setCurrentUser,
}: ISignInProps) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [notFoundUser, setNotFoundUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate({ pathname: "/" });
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInApi(values)
      .then((data) => {
        localStorage.setItem("access_token", data.access_token);
        setIsLoggedIn(true);
        setCurrentUser(data.user);
        navigate("/");
      })
      .catch((error) => {
        error.json().then(() => {
          setNotFoundUser(true);
        });
      });
  };

  const handlePrevStepClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setNotFoundUser(false);
    setValues({
      username: "",
      password: "",
    });
  };

  return (
    <>
      {notFoundUser ? (
        <div>
          <p>Данного юзера не существует</p>
          <button
            className={styles.button}
            type="button"
            onClick={handlePrevStepClick}
          >
            Вернуться назад
          </button>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Вход</h2>
          <div className={styles.inputWrapper}>
            <input
              name="username"
              className={styles.input}
              placeholder={"Имя пользователя"}
              onChange={handleChange}
              value={values.username}
            />
          </div>
          <div className={styles.inputWrapper}>
            <input
              name="password"
              className={styles.input}
              placeholder={"Пароль"}
              onChange={handleChange}
              value={values.password}
            />
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.button} type="submit">
              Войти
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default SignIn;
