import React, { useState } from "react";
import { FC } from "react";
import Link from "react-router-dom";
import { createTemporaryUserApi } from "../../utils/api/api";
import styles from "./create-user.module.css";

const CreateUser: FC = () => {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    fathersname: "",
    employmentDate: new Date(),
    position: "",
    salary: 0,
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTemporaryUserApi(values);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Создание пользователя</h2>
      <div className={styles.inputWrapper}>
        <input
          name="firstname"
          className={styles.input}
          placeholder={"Имя"}
          onChange={handleChange}
          value={values.firstname}
        />
      </div>
      <div className={styles.inputWrapper}>
        <input
          name="lastname"
          className={styles.input}
          placeholder={"Фамилия"}
          onChange={handleChange}
          value={values.lastname}
        />
      </div>
      <div className={styles.inputWrapper}>
        <input
          name="fathersname"
          className={styles.input}
          placeholder={"Отчество"}
          onChange={handleChange}
          value={values.fathersname}
        />
      </div>
      <div className={styles.inputWrapper}>
        <input
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
        <button type="submit">Создать пользователя</button>
      </div>
      <p className={styles.disc}>
        Уже есть персональная ссылка для регистрации?
        {/* <Link to="/login" className={styles.link}>
          &nbsp;Завершить регистрацию
        </Link> */}
      </p>
      <p className={styles.disc}>
        Уже зарегистрированы?
        {/* <Link to="/login" className={styles.link}>
          &nbsp;Войти
        </Link> */}
      </p>
    </form>
  );
};

export default CreateUser;
