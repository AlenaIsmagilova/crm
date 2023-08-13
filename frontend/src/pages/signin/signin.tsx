import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ISignInProps } from "../../helpers/types";
import { signInApi } from "../../utils/api/api";
import styles from "./signin.module.css";

const SignIn = ({ isLoggedIn }: ISignInProps): JSX.Element => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [notFoundUser, setNotFoundUser] = useState(false);
  const navigate = useNavigate();

  if (isLoggedIn) {
    navigate({ pathname: "/users/me" });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInApi(values)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((token) => {
        localStorage.setItem("access_token", token.access_token);
        navigate({ pathname: "/users/me" });
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
        <>
          <p>Данного юзера не существует</p>
          <button
            className={styles.button}
            type="button"
            onClick={handlePrevStepClick}
          >
            Вернуться назад
          </button>
        </>
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
