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
import { useContext, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import getCategories from "../../../actions/categoryRequests/getCats";
import getLogs from "../../../actions/logRequests/getLogs";
import getSubCategories from "../../../actions/subCategoryRequests/getSubCats";
import { Category, Log, Subcategory } from "../../../typings";
import {
  NavBarContext,
  NavBarContextTypes,
} from "../components/ContextNavBar/ContextNavBar";
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
  // Consume context for Logs.
  const {
    logs,
    setLogs,
    subCategories,
    setSubCategories,
    categories,
    setCategories,
  } = useContext<NavBarContextTypes | any>(NavBarContext);

  console.log(logs, subCategories, categories);

  // Get categories, subcategories and logs here in a useEffect hook.
  // Store this in state via the NavBarContext hook.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedLogs: Log[] | undefined | null = await getLogs();
        setLogs(fetchedLogs);
        const fetchedSubCategories: Subcategory[] | undefined | null =
          await getSubCategories();
        setSubCategories(fetchedSubCategories);
        const fetchedCategories: Category[] | undefined | null =
          await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    return () => {};
  }, []);

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
          {/* Display the name of each category here. For each category,
          render a doughnut chart.
          */}
          {categories
            ? categories.map((category: Category) => {
                return (
                  <>
                    {category.name}
                    <Doughnut data={data} />
                  </>
                );
              })
            : ""}
        </>
      </div>

      <Footer />
    </div>
  );
}
