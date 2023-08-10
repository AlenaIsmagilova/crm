import React, { useEffect, useState } from "react";
import { Link, useNavigate, redirect } from "react-router-dom";
import { setCookie } from "../../helpers";
import { signInApi } from "../../utils/api/api";
import styles from "./signin.module.css";

interface ISignInProps {
  isLoggedIn: boolean;
}

const SignIn = ({ isLoggedIn }: ISignInProps) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/users");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInApi(values).then((token) => setCookie("access_token", token));
  };

  if (isLoggedIn) {
    return redirect("/");
  }

  return (
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
        <button type="submit">Войти</button>
      </div>
      <p className={styles.disc}>
        Вы — новый пользователь и у вас есть персональная ссылка для
        регистрации?
        {/* <Link to="/register" className={styles.link}>
          &nbsp;Завершить регистрацию
        </Link> */}
      </p>
      <p className={styles.disc}>
        Хотите создать нового пользователя?
        {/* <Link to="/register" className={styles.link}>
          &nbsp;Создать
        </Link> */}
      </p>
    </form>
  );
};

export default SignIn;
