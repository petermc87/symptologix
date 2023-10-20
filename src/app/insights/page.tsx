"use client";

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
import { Doughnut } from "react-chartjs-2";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import styles from "./page.module.scss";
// Register ChartJS elements.
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

//Doughnut Color scheme overrides
Chart.overrides.doughnut.color = "#000";
Chart.defaults.color = "#000";
Chart.overrides.doughnut.color = "#000";

export default function Insights() {
  // Dataset for doughnut.
  const data = {
    labels: ["Smell", "Taste", "Emotion"],
    datasets: [
      {
        label: "# of occurances",
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
        cutout: "40%",
      },
    ],
  };
  return (
    <div>
      <NavBar />
      <div className={styles.pageContainer} key={889}>
        <div className={styles.headingText}>Your Symptom Story</div>
        <>
          <Doughnut data={data} />
        </>
      </div>

      <Footer />
    </div>
  );
}
