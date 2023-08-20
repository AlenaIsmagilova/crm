import React, { SetStateAction, useEffect, useState, Dispatch } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getUsersApi,
  updateUserAfterFirementApi,
  updateUserApi,
} from "../../utils/api/api";
import styles from "./profile.module.css";
import moment from "moment";
import { IUser, RoleEnum } from "../../helpers/types";

interface IProfileProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  currentUser: IUser;
  isLoggedIn: boolean;
}

const Profile = ({ setIsLoggedIn, currentUser, isLoggedIn }: IProfileProps) => {
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [editedUserValues, setEditedUserValues] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    birthDate: "",
    employmentDate: "",
    position: "",
    salary: 0,
    role: "",
  });

  const [userIdEditMode, setUserIdEditMode] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      getUsersApi()
        .then((users) => setAllUsers(users))
        .catch((err) => {
          navigate("/signin");
        });
    }
  }, []);

  if (!isLoggedIn) {
    return <></>;
  }

  const handleExitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    navigate({ pathname: "/signin" });
  };

  const handleEditUserClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    user: IUser
  ) => {
    e.preventDefault();
    setUserIdEditMode(user.id!);
    setEditedUserValues(user);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { value, name } = e.target;
    setEditedUserValues({ ...editedUserValues, [name]: value });
  };

  const updateAllUsers = (user: IUser) => {
    const copyOfArray = [...allUsers];
    const indexOfUser = copyOfArray.findIndex((el) => el.id === user.id);
    copyOfArray.splice(indexOfUser, 1, user);
    setAllUsers(copyOfArray);
  };

  const handleEditUserSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUserApi(editedUserValues).then((user) => updateAllUsers(user));
    setUserIdEditMode(null);
  };

  const handleCancelEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUserIdEditMode(null);
  };

  const handleFirementUserClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    user: IUser
  ) => {
    e.preventDefault();
    updateUserAfterFirementApi(user.id!).then((user) =>
      setAllUsers(allUsers.filter((u) => u.id !== user.id))
    );
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.buttonWrapper}>
        {currentUser.role !== RoleEnum.USER && (
          <Link to="/create-new-user" className={styles.link}>
            Создать нового пользователя
          </Link>
        )}
        {(currentUser.role === RoleEnum.HR ||
          currentUser.role === RoleEnum.SUPERADMIN) && (
          <Link to="/metrics" className={styles.link}>
            Посмотреть данные по компании
          </Link>
        )}
        <button
          className={styles.button}
          type="button"
          onClick={handleExitClick}
        >
          Выйти из профиля
        </button>
      </div>
      <h2 className={styles.userTitle}>Информация о сотруднике</h2>
      <div className={styles.userDisc}>
        <p>Имя: {currentUser.firstName}</p>
        <p>Фамилия: {currentUser.lastName}</p>
        <p>Отчество: {currentUser.fatherName}</p>
        <p>
          Дата рождения: {moment(currentUser.birthDate).format("DD.MM.YYYY г.")}
        </p>
        <p>
          Дата трудоустройства:{" "}
          {moment(currentUser.employmentDate).format("DD.MM.YYYY г.")}
        </p>
        <p>Должность: {currentUser.position}</p>
        <p>Заработная плата: {currentUser.salary} руб.</p>
        <p>Имя пользователя для входа в систему: {currentUser.username} </p>
      </div>
      <form
        id="editForm"
        className={styles.form}
        onSubmit={handleEditUserSubmit}
      ></form>
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Отчество</th>
            <th>Дата рождения</th>
            <th>Дата трудоустройства</th>
            <th>Должность</th>
            <th>Заработная плата</th>
            {currentUser.role !== RoleEnum.USER && <th></th>}
          </tr>
        </thead>
        <tbody>
          {allUsers
            .filter((user) => user.role !== RoleEnum.SUPERADMIN)
            .map((user) => (
              <tr className={styles.itemsList} key={user.id}>
                {userIdEditMode === user.id ? (
                  <>
                    <td>
                      <div className={styles.inputWrapper}>
                        <label className={styles.label} htmlFor="name">
                          <input
                            form="editForm"
                            name="firstName"
                            id="name"
                            className={styles.input}
                            placeholder="Имя"
                            onChange={handleChange}
                            value={editedUserValues.firstName}
                          />
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className={styles.inputWrapper}>
                        <label className={styles.label} htmlFor="lastname">
                          <input
                            form="editForm"
                            name="lastName"
                            id="lastname"
                            className={styles.input}
                            placeholder="Фамилия"
                            onChange={handleChange}
                            value={editedUserValues.lastName}
                          />
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className={styles.inputWrapper}>
                        <label className={styles.label} htmlFor="fathername">
                          <input
                            form="editForm"
                            name="fatherName"
                            id="fathername"
                            className={styles.input}
                            placeholder="Отчество"
                            onChange={handleChange}
                            value={editedUserValues.fatherName}
                          />
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className={styles.inputWrapper}>
                        <label className={styles.label} htmlFor="bday">
                          <input
                            form="editForm"
                            type="date"
                            id="bday"
                            name="birthDate"
                            className={styles.input}
                            placeholder="Дата рождения"
                            onChange={handleChange}
                            value={moment(editedUserValues.birthDate).format(
                              "YYYY-MM-DD"
                            )}
                          />
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className={styles.inputWrapper}>
                        <label className={styles.label} htmlFor="emplDate">
                          <input
                            form="editForm"
                            type="date"
                            id="emplDate"
                            name="employmentDate"
                            className={styles.input}
                            placeholder="Дата трудоустройства"
                            onChange={handleChange}
                            value={moment(
                              editedUserValues.employmentDate
                            ).format("YYYY-MM-DD")}
                          />
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className={styles.inputWrapper}>
                        <label className={styles.label} htmlFor="position">
                          <input
                            form="editForm"
                            name="position"
                            id="position"
                            className={styles.input}
                            placeholder="Должность"
                            onChange={handleChange}
                            value={editedUserValues.position}
                          />
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className={styles.inputWrapper}>
                        <input
                          form="editForm"
                          name="salary"
                          className={styles.input}
                          placeholder="Заработная плата"
                          onChange={handleChange}
                          value={editedUserValues.salary}
                        />
                      </div>
                    </td>
                    <td>
                      <div
                        className={`${styles.buttonWrapper} ${styles.flexColumn}`}
                      >
                        <button
                          className={styles.button}
                          type="submit"
                          form="editForm"
                        >
                          Сохранить
                        </button>
                        <button
                          className={styles.button}
                          type="button"
                          onClick={handleCancelEditClick}
                        >
                          Отменить
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <>
                      <td className={styles.desc}>{user.firstName}</td>
                      <td className={styles.desc}>{user.lastName}</td>
                      <td className={styles.desc}>{user.fatherName}</td>
                      <td className={styles.desc}>
                        {moment(user.birthDate).format("DD.MM.YYYY г.")}
                      </td>
                      <td className={styles.desc}>
                        {moment(user.employmentDate).format("DD.MM.YYYY г.")}
                      </td>
                      <td className={styles.desc}>{user.position}</td>
                      <td className={styles.desc}>{user.salary}</td>
                    </>
                    {currentUser.role !== RoleEnum.USER && (
                      <td>
                        <button
                          className={styles.button}
                          type="button"
                          onClick={(e) => handleEditUserClick(e, user)}
                        >
                          Редактировать
                        </button>
                        <button
                          className={styles.button}
                          type="button"
                          onClick={(e) => handleFirementUserClick(e, user)}
                        >
                          Уволить
                        </button>
                      </td>
                    )}
                  </>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
