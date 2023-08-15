import { useEffect, useState } from "react";
import {
  getBirthdayPeopleApi,
  getCountOfEmployedInMonthApi,
  getCountOfEmployedInYearApi,
  getCountOfFiredInMonthApi,
  getCountOfFiredInYearApi,
} from "../../utils/api/api";

const Metrics = ({ isLoggedIn }: any) => {
  const [countEmployedInCurrentMonth, setCountEmployedInCurrentMonth] =
    useState("");
  const [countEmployedInCurrentYear, setCountEmployedInCurrentYear] =
    useState("");
  const [countFiredInCurrentMonth, setCountFiredInCurrentMonth] = useState("");
  const [countFiredInCurrentYear, setCountFiredInCurrentYear] = useState("");
  const [birthdayPeopleList, setBirthdayPeopleList] = useState([
    { firstName: "", lastName: "", birthDate: "", id: "" },
  ]);

  useEffect(() => {
    if (isLoggedIn) {
      getCountOfEmployedInMonthApi().then((res) =>
        setCountEmployedInCurrentMonth(res)
      );
      getCountOfEmployedInYearApi().then((res) =>
        setCountEmployedInCurrentYear(res)
      );
      getCountOfFiredInMonthApi().then((res) =>
        setCountFiredInCurrentMonth(res)
      );
      getCountOfFiredInYearApi().then((res) => setCountFiredInCurrentYear(res));
      getBirthdayPeopleApi().then((res) => {
        setBirthdayPeopleList(res);
        console.log(res);
      });
    }
  }, []);

  return (
    <>
      <p>
        Количество сотрудников, нанятых в текущем месяце:&nbsp;
        {countEmployedInCurrentMonth}
      </p>
      <p>
        Количество сотрудников, нанятых в текущем году:&nbsp;
        {countEmployedInCurrentYear}
      </p>
      <p>
        Количество сотрудников, уволенных в текущем месяце:&nbsp;
        {countFiredInCurrentMonth}
      </p>
      <p>
        Количество сотрудников, уволенных в текущем году:&nbsp;
        {countFiredInCurrentYear}
      </p>
      <ul>
        В этом месяце день рождения отмечают:&nbsp;
        {birthdayPeopleList.map((el) => (
          <li key={el.id}>
            <p>Имя: {el.firstName}</p>
            <p>Фамилия: {el.lastName}</p>
            <p>Дата рождения: {el.birthDate}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Metrics;
