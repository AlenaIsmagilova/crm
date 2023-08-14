import { useEffect, useState } from "react";
import {
  getBirthdayPeopleApi,
  getCountOfEmployedInMonthApi,
  getCountOfEmployedInYearApi,
  getCountOfFiredInMonthApi,
  getCountOfFiredInYearApi,
} from "../../utils/api/api";

const Metrics = () => {
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
    getCountOfEmployedInMonthApi().then((res) =>
      setCountEmployedInCurrentMonth(res)
    );
    getCountOfEmployedInYearApi().then((res) =>
      setCountEmployedInCurrentYear(res)
    );
    getCountOfFiredInMonthApi().then((res) => setCountFiredInCurrentMonth(res));
    getCountOfFiredInYearApi().then((res) => setCountFiredInCurrentYear(res));
    getBirthdayPeopleApi().then((res) => console.log(res));
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
          <div key={el.id}>
            <li>Имя: {el.firstName}</li>
            <li>Фамилия: {el.lastName}</li>
            <li>Дата рождения: {el.birthDate}</li>
          </div>
        ))}
      </ul>
    </>
  );
};

export default Metrics;
