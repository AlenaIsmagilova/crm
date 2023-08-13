import React, { useEffect, useState } from "react";
import { FC } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCurrentTemporaryUserApi, signUpApi } from "../../utils/api/api";
import styles from "./signup.module.css";

type TParams = {
  username: string;
};

const SignUp: FC = () => {
  const [values, setValues] = useState({
    password: "",
  });
  const [currentUser, setCurrentUser] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    employmentDate: "",
    position: "",
    salary: 0,
    role: "",
  });
  const params = useParams<TParams>();
  const [errorInUsername, setErrorInUsername] = useState(false);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentTemporaryUserApi(params.username as string)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((user) => setCurrentUser(user))
      .catch((error) => {
        error.json().then((data: any) => {
          setErrorInUsername(true);
          setErrorText(data.message);
        });
      });
  }, [params.username]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUpApi(values, params.username as string).then((token) => {
      localStorage.setItem("access_token", token.access_token);
      navigate({ pathname: "/users/me" });
    });
  };

  return (
    <>
      {errorInUsername ? (
        <p>{`${errorText}`}. Обратитесь к своему HR</p>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Завершение регистрации</h2>
          <h3>
            Добро пожаловать в нашу компанию, {`${currentUser.firstName}`}. Это
            твое имя пользователя:
            {`${params.username}`}. Запомни его, пожалуйста, и используй каждый
            раз для входа в систему.
          </h3>
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
            Уже зарегистрированы?
            <Link to="/register" className={styles.link}>
              &nbsp;Войти
            </Link>
          </p>
        </form>
      )}
    </>
  );
};

export default SignUp;
