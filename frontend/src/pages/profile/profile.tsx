import {
  JSXElementConstructor,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  deleteUserApi,
  getUser,
  getUsers,
  updateUserApi,
} from '../../utils/api/api';
import styles from './profile.module.css';

interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  fatherName: string;
  employmentDate: string;
  position: string;
  salary: number;
  role: string; // Role enum
}

const Profile = ({ setIsLoggedIn, currentUser, isLoggedIn }: any) => {
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [editedUserValues, setEditedUserValues] = useState({
    firstName: '',
    lastName: '',
    fatherName: '',
    employmentDate: '',
    position: '',
    salary: 0,
    role: '',
  });

  const [userIdEditMode, setUserIdEditMode] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/signin');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      getUsers()
        .then((users) => setAllUsers(users))
        .catch((err) => {
          navigate('/signin');
        });
    }
  }, []);

  if (!isLoggedIn) {
    return <></>;
  }

  const handleExitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    navigate({ pathname: '/signin' });
  };

  const handleEditUserClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    user: any
  ) => {
    e.preventDefault();
    setUserIdEditMode(user.id);
    setEditedUserValues(user);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;
    setEditedUserValues({ ...editedUserValues, [name]: value });
  };

  const updateAllUsers = (user: any) => {
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

  const handleDeleteUserClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    user: any
  ) => {
    e.preventDefault();
    deleteUserApi(user);
    const arrAfterDeletedUser = allUsers.filter((el) => el.id !== user.id);
    setAllUsers(arrAfterDeletedUser);
  };

  return (
    <div>
      <h2 className={styles.userTitle}>Информация о сотруднике</h2>
      <div className={styles.userDisc}>
        <p>Имя: {currentUser.firstName}</p>
        <p>Фамилия: {currentUser.lastName}</p>
        <p>Отчество: {currentUser.fatherName}</p>
        <p>Дата трудоустройства:</p>
        <p>{currentUser.employmentDate.toLocaleString()}</p>
        <p>Должность: {currentUser.position}</p>
        <p>Заработная плата: {currentUser.salary} руб.</p>
      </div>
      {currentUser.role !== 'USER' && (
        <p className={styles.disc}>
          Хотите создать нового пользователя?
          <Link to='/create-new-user' className={styles.link}>
            &nbsp;Создать
          </Link>
        </p>
      )}
      <ul className={styles.list}>
        {allUsers
          .filter((user) => user.role !== 'SUPERADMIN')
          .map((user) => (
            <li className={styles.itemsList} key={user.id}>
              {userIdEditMode === user.id ? (
                <form className={styles.form} onSubmit={handleEditUserSubmit}>
                  <h2 className={styles.title}>Создание пользователя</h2>
                  <div className={styles.inputWrapper}>
                    <input
                      name='firstName'
                      className={styles.input}
                      placeholder={'Имя'}
                      onChange={handleChange}
                      value={editedUserValues.firstName}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <input
                      name='lastName'
                      className={styles.input}
                      placeholder={'Фамилия'}
                      onChange={handleChange}
                      value={editedUserValues.lastName}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <input
                      name='fatherName'
                      className={styles.input}
                      placeholder={'Отчество'}
                      onChange={handleChange}
                      value={editedUserValues.fatherName}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <input
                      type='date'
                      name='employmentDate'
                      className={styles.input}
                      placeholder={'Дата трудоустройства'}
                      onChange={handleChange}
                      value={editedUserValues.employmentDate}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <input
                      name='position'
                      className={styles.input}
                      placeholder={'Должность'}
                      onChange={handleChange}
                      value={editedUserValues.position}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <input
                      name='salary'
                      className={styles.input}
                      placeholder={'Заработная плата'}
                      onChange={handleChange}
                      value={editedUserValues.salary}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <input
                      name='role'
                      className={styles.input}
                      placeholder={'Роль в организации'}
                      onChange={handleChange}
                      value={editedUserValues.role}
                    />
                  </div>
                  <div className={styles.buttonWrapper}>
                    <button className={styles.button} type='submit'>
                      Сохранить
                    </button>
                    <button
                      className={styles.button}
                      type='button'
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
                    <p>Дата трудоустройства: {user.employmentDate}</p>
                    <p>Должность: {user.position}</p>
                    <p>Заработная плата: {user.salary} руб.</p>
                  </div>
                  {currentUser.role !== 'USER' && (
                    <>
                      <button
                        className={styles.button}
                        type='button'
                        onClick={(e) => handleEditUserClick(e, user)}
                      >
                        Редактировать
                      </button>
                      <button
                        className={styles.button}
                        type='button'
                        onClick={(e) => handleDeleteUserClick(e, user)}
                      >
                        Удалить
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
          type='button'
          onClick={handleExitClick}
        >
          Выйти из профиля
        </button>
      </div>
    </div>
  );
};

export default Profile;
