import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styles from "./Perks.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Perks() {
  // Dataset for doughnut chart.
  const data = {
    labels: ["Light", "Medium", "Dark"],
    datasets: [
      {
        label: "# of occorances",
        data: [20, 30, 5],
        backgroundColor: [
          "rgba(147, 145, 255, 0.9)",
          "rgba(105, 102, 212, 0.9)",
          "rgba(0, 7, 89, 0.9)",
        ],
        borderColor: [
          "rgba(147, 145, 255, 1)",
          "rgba(105, 102, 212, 1)",
          "rgba(0, 7, 89, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div className={styles.perkContainer}>
        <h1 className={styles.headingText} id={styles.logsText}>
          Log your symptoms with ease
        </h1>
        <div className={styles.chartContainer}>
          <div id={styles.inputField} className={styles.chartType}>
            INPUT
          </div>
          <div id={styles.currentLog} className={styles.chartType}>
            LOG
          </div>
        </div>
      </div>
      <div className={styles.perkContainer} id={styles.metrics}>
        <h1 className={styles.headingText}>Look at metrics over time</h1>
        <div className={styles.chartContainer}>
          {/* <div id={styles.pie} className={styles.chartType}>
            PIE
          </div> */}
          <div className={styles.chartType}>BAR</div>
          <div id={styles.bar} className={styles.chartType}>
            <Doughnut data={data} />
          </div>
        </div>
      </div>
      <div className={styles.perkContainer}>
        <h1 className={styles.headingText} id={styles.logsText}>
          Pinpoint your issue
        </h1>
        <div className={styles.chartContainer}>
          <div id={styles.pie} className={styles.chartType}>
            PIE
          </div>
          <div id={styles.bar} className={styles.chartType}>
            BAR
          </div>
        </div>
      </div>
    </>
  );
}
