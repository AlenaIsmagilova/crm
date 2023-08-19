import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoleEnum } from "../../helpers/types";
import { createTemporaryUserApi } from "../../utils/api/api";
import styles from "./create-user.module.css";

const CreateUser = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    employmentDate: "",
    birthDate: "",
    position: "",
    salary: 0,
    role: "default",
  });
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
            <label className={styles.label} htmlFor="bday">
              Дата рождения:
              <input
                type="date"
                id="bday"
                name="birthDate"
                className={styles.input}
                placeholder={"Дата рождения"}
                onChange={handleChange}
                value={values.birthDate}
              />
            </label>
          </div>
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="emplDate">
              Дата трудоустройства:
              <input
                id="emplDate"
                type="date"
                name="employmentDate"
                className={styles.input}
                placeholder={"Дата трудоустройства"}
                onChange={handleChange}
                value={values.employmentDate}
              />
            </label>
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
            <select
              className={styles.select}
              name="role"
              value={values.role}
              onChange={handleChange}
            >
              <option value="default" disabled>
                --Выберите роль сотрудника--
              </option>
              <option value={RoleEnum.USER}>Сотрудник</option>
              <option value={RoleEnum.HR}>HR-специалист</option>
            </select>
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
            http://localhost:3000/signup/{username}
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
