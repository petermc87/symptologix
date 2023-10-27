import { Entry } from "@prisma/client";
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
import { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { Subcategory } from "../../../../typings";
import {
  NavBarContext,
  NavBarContextTypes,
} from "../ContextNavBar/ContextNavBar";
import styles from "./MostOccurring.module.scss";

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
// Bar chart defaults and overrides for colors.
Chart.overrides.bar.color = "#000";
Chart.overrides.bar.borderColor = "rgba(239, 239, 240, 1)";
Chart.defaults.color = "#000";

export default function MostOccurring() {
  // Create side effect to get all the subcategories

  // Consume the entries context so that we can display the most occurring subcats in a
  // chart below.
  const { entries, categories, subCategories } = useContext<
    NavBarContextTypes | any
  >(NavBarContext);

  console.log(entries, subCategories);

  // cycle through subcategories contained in the categories
  if (subCategories) {
    subCategories.map((sub: Subcategory) => {
      console.log(sub);
    });
  }

  // cycle through entries and display the subcatId
  if (entries) {
    entries.map((entry: Entry) => {
      console.log(entry.subCategoryId);
    });
  }

  // Options for bar
  // Options for line chart.
  const options = {
    responsiveness: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: " Occurances",
      },
    },
  };

  // Map data to array
  const occurrences = Array(subCategories.length).fill(0);

  // 1. Maps over every entry.
  entries.map((entry: Entry) => {
    // 2. Stores the index of the subcat in the subCats array by matching the id of the
    //  subCategoryId
    const subCategoryIndex = subCategories.findIndex(
      (subcat: Subcategory) => subcat.id === entry.subCategoryId
    );

    // 3. If the index is not a negative number, then interate up 1 the number at the subCategoryIndex.
    if (subCategoryIndex !== -1) {
      occurrences[subCategoryIndex]++;
    }
  });

  // Bar data
  const barData = {
    labels: subCategories!.map((subcategory: Subcategory) => subcategory.name),
    datasets: [
      {
        labels: "",
        data: occurrences,
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
    <>
      {/* Add bar chart from chartjs and input data based from the most */}
      {/* occurring subcategory */}
      <div className={styles.mostOccurringWrapper}>Most Occurring</div>
      {/* Render the most occurring subcategories.  So here we consume the subcategories */}
      {/* context. */}
      <Bar data={barData} options={options} />
    </>
  );
}
