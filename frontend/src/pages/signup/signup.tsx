import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IUser } from "../../helpers/types";
import { getCurrentTemporaryUserApi, signUpApi } from "../../utils/api/api";
import styles from "./signup.module.css";

type TParams = {
  username: string;
};

interface ISignUpProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setCurrentUser: Dispatch<SetStateAction<IUser>>;
}

const SignUp = ({
  isLoggedIn,
  setIsLoggedIn,
  setCurrentUser,
}: ISignUpProps) => {
  const [values, setValues] = useState({
    password: "",
  });
  const [tempUser, setTempUser] = useState({
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
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (!isLoggedIn) {
      getCurrentTemporaryUserApi(params.username as string)
        .then((user) => setTempUser(user))
        .catch((error) => {
          error.json().then((data: Error) => {
            setErrorInUsername(true);
            setErrorText(data.message);
          });
        });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUpApi(values, params.username as string).then((data) => {
      localStorage.setItem("access_token", data.access_token);
      setIsLoggedIn(true);
      setCurrentUser(data.user);
      navigate({ pathname: "/" });
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
            Добро пожаловать в нашу компанию, {`${tempUser.firstName}`}. Это
            твое имя пользователя:&nbsp;
            {`${params.username}`}. Запомни его, пожалуйста, и используй каждый
            раз для входа в систему.
          </h3>
          <div className={styles.inputWrapper}>
            <input
              type="password"
              name="password"
              className={styles.input}
              placeholder={"Придумайте пароль"}
              onChange={handleChange}
              value={values.password}
            />
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.button} type="submit">
              Зарегистрироваться
            </button>
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
