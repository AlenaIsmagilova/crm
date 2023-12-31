import { Line } from "react-chartjs-2";
import styles from "./line-chart.module.css";

function LineChart({ chartData }: any) {
  const currentYear = new Date().getFullYear();
  return (
    <div className={styles.mainContainer}>
      <h2 style={{ textAlign: "center" }}>
        Ожидаемые выплаты заработной платы
      </h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: `Выплаты заработной платы в ${currentYear}г.`,
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}
export default LineChart;
