import { faker } from "@faker-js/faker";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Image } from "react-bootstrap";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import styles from "./Perks.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

// Changing the color of the doughnut default text.
Chart.overrides.doughnut.color = "#000";
Chart.overrides.bar.color = "#000";
Chart.defaults.color = "#000";
Chart.overrides.bar.borderColor = "rgba(239, 239, 240, 1)";

export default function Perks() {
  // Options for line chart.
  const options = {
    responsiveness: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: " Symptoms over time",
      },
    },
  };
  const labels = ["January", "February", "March", "April", "May"];

  // Dataset for line chart.
  const lineData = {
    labels,

    datasets: [
      {
        label: "Smell",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 50 })),
        borderColor: "rgba(0, 7, 89)",
        backgroundColor: "rgba(0, 7, 89, 0.5)",
        borderWidth: 2,
      },
      {
        label: "Taste",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 50 })),
        borderColor: "rgba(99, 93, 255)",
        backgroundColor: "rgba(99, 93, 255, 0.5)",
        borderWidth: 2,
      },
    ],
  };

  // Dataset for doughnut chart.
  const data = {
    labels: ["Smell", "Taste", "Emotion"],
    datasets: [
      {
        label: "# of occorances",
        data: [20, 30, 5],
        backgroundColor: [
          "rgba(147, 145, 255, 1)",
          "rgba(105, 102, 212, 1)",
          "rgba(0, 7, 89, 1)",
        ],
        borderColor: [
          "rgba(147, 145, 255, 1)",
          "rgba(105, 102, 212, 1)",
          "rgba(0, 7, 89, 1)",
        ],
        borderWidth: 1,
        // Determines how big the hole in the middle of the chart is.
        cutout: "40%",
      },
    ],
  };

  // Dataset for barchart
  const barData = {
    labels,
    datasets: [
      {
        label: "Smell",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 50 })),
        backgroundColor: "rgba(0, 7, 89)",
      },
      {
        label: "Taste",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 50 })),
        backgroundColor: "rgba(147, 145, 255, 1)",
      },
    ],
  };
  return (
    <>
      <div className={styles.perkContainer}>
        <h1 className={styles.headingText} id={styles.logsText}>
          Log your symptoms with <span>ease</span>
        </h1>
        <div className={styles.chartContainer} id={styles.logsChartsContainer}>
          <div id={styles.inputField} className={styles.chartType}>
            <Image src="https://symptologix.s3.amazonaws.com/Screenshot+from+2023-09-29+19-54-26.png" />
          </div>
          <div id={styles.currentLog} className={styles.chartType}>
            <Image src="https://symptologix.s3.amazonaws.com/Screenshot+from+2023-09-29+18-52-20.png" />
          </div>
        </div>
      </div>
      <div className={styles.perkContainer} id={styles.metrics}>
        <h1 className={styles.headingText}>Pinpoint your issue</h1>
        <div id={styles.issuesCharts} className={styles.chartContainer}>
          <div id={styles.bar} className={styles.chartType}>
            <Bar options={options} data={barData} />
          </div>
          <div className={styles.chartType}>
            <Doughnut data={data} />
          </div>
        </div>
      </div>
      <div className={styles.perkContainer}>
        <h1 className={styles.headingText} id={styles.logsText}>
          Look at metrics over time
        </h1>

        <div className={styles.chartContainer}>
          <div id={styles.lineChart} className={styles.chartType}>
            <Line options={options} data={lineData} />
          </div>
        </div>
      </div>
    </>
  );
}
