import moment from "moment";
import { useEffect, useState } from "react";
import {
  getBirthdayPeopleApi,
  getCountOfEmployedInMonthApi,
  getCountOfEmployedInYearApi,
  getCountOfFiredInMonthApi,
  getCountOfFiredInYearApi,
  getExpectedSalaryPaymentsApi,
} from "../../utils/api/api";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import LineChart from "../../components/line-chart/line-chart";

Chart.register(CategoryScale);

interface IMetricsProps {
  isLoggedIn: boolean;
}

const Metrics = ({ isLoggedIn }: IMetricsProps) => {
  const [countEmployedInCurrentMonth, setCountEmployedInCurrentMonth] =
    useState("");
  const [countEmployedInCurrentYear, setCountEmployedInCurrentYear] =
    useState("");
  const [countFiredInCurrentMonth, setCountFiredInCurrentMonth] = useState("");
  const [countFiredInCurrentYear, setCountFiredInCurrentYear] = useState("");
  const [expectedSalaryPayments, setExpectedSalaryPayments] = useState();

  const data = {
    labels: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    datasets: [
      {
        label: "Сумма,руб.",
        data: expectedSalaryPayments,
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

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
      });
      getExpectedSalaryPaymentsApi().then((res) => {
        console.log(res);
        setExpectedSalaryPayments(res);
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
      <LineChart chartData={data} />
      <ul>
        {birthdayPeopleList.length !== 0 ? (
          <>
            <p>В этом месяце день рождения отмечают:&nbsp;</p>
            {birthdayPeopleList.map((el) => (
              <li key={el.id}>
                <p>Имя: {el.firstName}</p>
                <p>Фамилия: {el.lastName}</p>
                <p>
                  Дата рождения: {moment(el.birthDate).format("DD.MM.YYYY г.")}
                </p>
              </li>
            ))}
          </>
        ) : (
          <p>В этом месяце дней рождений нет</p>
        )}
      </ul>
    </>
  );
};

export default Metrics;
