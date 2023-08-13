import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteCookie } from "../../helpers";
import { getUser } from "../../utils/api/api";
import styles from "./user.module.css";

const User = () => {
  const [currentUser, setCurrentUser] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    employmentDate: "",
    position: "",
    salary: 0,
    role: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getUser().then((user) => setCurrentUser(user));
  }, [currentUser]);

  const handleExitClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteCookie("access_token");
    navigate({ pathname: "/signin" });
    console.log(1);
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
      <p className={styles.disc}>
        Хотите создать нового пользователя?
        <Link to="/" className={styles.link}>
          &nbsp;Создать
        </Link>
      </p>
      <button type="button" onClick={handleExitClick}>
        Выйти из профиля
      </button>
    </div>
  );
};

export default User;
