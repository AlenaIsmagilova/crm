import React, { useState } from "react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { signUpApi } from "../../utils/api/api";
import styles from "./signup.module.css";

const SignUp: FC = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUpApi(values);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Завершение регистрации</h2>
      <div className={styles.inputWrapper}>
        <input
          name="username"
          className={styles.input}
          placeholder={"Имя пользователя, полученное от HR"}
          onChange={handleChange}
          value={values.username}
        />
      </div>
      <div className={styles.inputWrapper}>
        <input
          name="password"
          className={styles.input}
          placeholder={"Придумайте пароль"}
          onChange={handleChange}
          value={values.password}
        />
      </div>
      <div className={styles.buttonWrapper}>
        <button type="submit">Зарегистрироваться</button>
      </div>
      <p className={styles.disc}>
        Вы — новый пользователь и у вас есть персональная ссылка для
        регистрации?
        <Link to="/register" className={styles.link}>
          &nbsp;Завершить регистрацию
        </Link>
      </p>
      <p className={styles.disc}>
        Уже зарегистрированы?
        <Link to="/register" className={styles.link}>
          &nbsp;Войти
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
