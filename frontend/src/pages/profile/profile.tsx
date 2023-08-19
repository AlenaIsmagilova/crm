import React, { SetStateAction, useEffect, useState, Dispatch } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getUsers,
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
      getUsers()
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
    <div>
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
      </div>
      {currentUser.role !== "USER" && (
        <p className={styles.disc}>
          Хотите создать нового пользователя?
          <Link to="/create-new-user" className={styles.link}>
            &nbsp;Создать
          </Link>
        </p>
      )}
      <ul className={styles.list}>
        {allUsers
          .filter((user) => user.role !== "SUPERADMIN")
          .map((user) => (
            <li className={styles.itemsList} key={user.id}>
              {userIdEditMode === user.id ? (
                <form className={styles.form} onSubmit={handleEditUserSubmit}>
                  <div className={styles.inputWrapper}>
                    <input
                      name="firstName"
                      className={styles.input}
                      placeholder="Имя"
                      onChange={handleChange}
                      value={editedUserValues.firstName}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <input
                      name="lastName"
                      className={styles.input}
                      placeholder="Фамилия"
                      onChange={handleChange}
                      value={editedUserValues.lastName}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <input
                      name="fatherName"
                      className={styles.input}
                      placeholder="Отчество"
                      onChange={handleChange}
                      value={editedUserValues.fatherName}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="bday">
                      <input
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
                  <div className={styles.inputWrapper}>
                    <input
                      type="date"
                      name="employmentDate"
                      className={styles.input}
                      placeholder="Дата трудоустройства"
                      onChange={handleChange}
                      value={moment(editedUserValues.employmentDate).format(
                        "YYYY-MM-DD"
                      )}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <input
                      name="position"
                      className={styles.input}
                      placeholder="Должность"
                      onChange={handleChange}
                      value={editedUserValues.position}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <input
                      name="salary"
                      className={styles.input}
                      placeholder="Заработная плата"
                      onChange={handleChange}
                      value={editedUserValues.salary}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <select
                      name="role"
                      value={editedUserValues.role}
                      onChange={handleChange}
                    >
                      <option value={RoleEnum.USER}>Сотрудник</option>
                      <option value={RoleEnum.HR}>HR-специалист</option>
                    </select>
                  </div>
                  <div className={styles.buttonWrapper}>
                    <button className={styles.button} type="submit">
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
                </form>
              ) : (
                <>
                  <div className={styles.card}>
                    <p>Имя: {user.firstName}</p>
                    <p>Фамилия: {user.lastName}</p>
                    <p>Отчество: {user.fatherName}</p>
                    <p>
                      Дата рождения:
                      {moment(user.birthDate).format("DD.MM.YYYY г.")}
                    </p>
                    <p>
                      Дата трудоустройства:
                      {moment(user.employmentDate).format("DD.MM.YYYY г.")}
                    </p>
                    <p>Должность: {user.position}</p>
                    <p>Заработная плата: {user.salary} руб.</p>
                  </div>
                  {currentUser.role !== "USER" && (
                    <>
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
                    </>
                  )}
                </>
              )}
            </li>
          ))}
      </ul>
      <div className={styles.buttonWrapper}>
        <button
          className={styles.button}
          type="button"
          onClick={handleExitClick}
        >
          Выйти из профиля
        </button>
        {currentUser.role === "HR" && (
          <p className={styles.disc}>
            Посмотреть данные по компании
            <Link to="/metrics" className={styles.link}>
              &nbsp;Статистика
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
