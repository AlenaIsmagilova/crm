import React, { useState } from "react";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createTemporaryUserApi } from "../../utils/api/api";
import styles from "./create-user.module.css";

const CreateUser: FC = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    employmentDate: "",
    position: "",
    salary: 0,
    role: "",
  });
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTemporaryUserApi(values).then((res) => setUsername(res.username));
  };

  const prevStepClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <>
      {username.length === 0 ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Создание пользователя</h2>
          <div className={styles.inputWrapper}>
            <input
              name="firstName"
              className={styles.input}
              placeholder={"Имя"}
              onChange={handleChange}
              value={values.firstName}
            />
          </div>
          <div className={styles.inputWrapper}>
            <input
              name="lastName"
              className={styles.input}
              placeholder={"Фамилия"}
              onChange={handleChange}
              value={values.lastName}
            />
          </div>
          <div className={styles.inputWrapper}>
            <input
              name="fatherName"
              className={styles.input}
              placeholder={"Отчество"}
              onChange={handleChange}
              value={values.fatherName}
            />
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="date"
              name="employmentDate"
              className={styles.input}
              placeholder={"Дата трудоустройства"}
              onChange={handleChange}
              value={values.employmentDate}
            />
          </div>
          <div className={styles.inputWrapper}>
            <input
              name="position"
              className={styles.input}
              placeholder={"Должность"}
              onChange={handleChange}
              value={values.position}
            />
          </div>
          <div className={styles.inputWrapper}>
            <input
              name="salary"
              className={styles.input}
              placeholder={"Заработная плата"}
              onChange={handleChange}
              value={values.salary}
            />
          </div>
          <div className={styles.inputWrapper}>
            <input
              name="role"
              className={styles.input}
              placeholder={"Роль в организации"}
              onChange={handleChange}
              value={values.role}
            />
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.button} type="submit">
              Создать пользователя
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.alert}>
          <p>
            Oтправьте ссылку новому сотруднику для завершения регистрации
            http://localhost:3000/{username}
          </p>
          <button
            className={styles.button}
            onClick={prevStepClick}
            type="button"
          >
            Вернуться назад
          </button>
        </div>
      )}
    </>
  );
};

export default CreateUser;
