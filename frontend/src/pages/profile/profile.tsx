import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, getUsers } from "../../utils/api/api";
import styles from "./profile.module.css";

const Profile = ({ setIsLoggedIn }: any) => {
  const [currentUser, setCurrentUser] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    employmentDate: "",
    position: "",
    salary: 0,
    role: "",
  });
  const [allUsers, setAllUsers] = useState([
    {
      firstName: "",
      lastName: "",
      fatherName: "",
      employmentDate: "",
      position: "",
      salary: 0,
      role: "",
      id: "",
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    getUser().then((user) => setCurrentUser(user));
    getUsers().then((users) => setAllUsers(users));
  }, []);

  const handleExitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    navigate({ pathname: "/signin" });
  };

  return (
    <div>
      <h2>Информация о сотруднике</h2>
      <p>Имя: {currentUser.firstName}</p>
      <p>Фамилия: {currentUser.lastName}</p>
      <p>Отчество: {currentUser.fatherName}</p>
      <p>Дата трудоустройства: {currentUser.employmentDate}</p>
      <p>Должность: {currentUser.position}</p>
      <p>Заработная плата: {currentUser.salary}</p>
      {currentUser.role !== "USER" && (
        <p className={styles.disc}>
          Хотите создать нового пользователя?
          <Link to="/" className={styles.link}>
            &nbsp;Создать
          </Link>
        </p>
      )}
      <ul>
        {allUsers
          .filter((user) => user.role !== "SUPERADMIN")
          .map((user) => (
            <li key={user.id}>
              <p>Имя: {user.firstName}</p>
              <p>Фамилия: {user.lastName}</p>
              <p>Отчество: {user.fatherName}</p>
              <p>Дата трудоустройства: {user.employmentDate}</p>
              <p>Должность: {user.position}</p>
              <p>Заработная плата: {user.salary}</p>
            </li>
          ))}
      </ul>

      <button type="button" onClick={handleExitClick}>
        Выйти из профиля
      </button>
    </div>
  );
};

export default Profile;
