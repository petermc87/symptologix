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
import { useContext, useState } from "react";
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
  const { entries, subCategories } = useContext<NavBarContextTypes | any>(
    NavBarContext
  );

  // State for holding the number of most occurring to display
  const [numberToDisplay, setNumberToDisplay] = useState<number>(5);

  const subtract = () => {
    setNumberToDisplay(numberToDisplay - 1);
  };

  const add = () => {
    // If the number is
    setNumberToDisplay(numberToDisplay + 1);
  };

  console.log(entries, subCategories);

  // Options for bar
  const options = {
    responsiveness: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Top ${numberToDisplay} Subcatgories`,
      },
    },
  };

  let occurrences: Array<number> = [];
  // Map data to array
  if (subCategories) {
    occurrences = Array(subCategories.length).fill(0);
  }

  // 1. Maps over every entry.
  if (entries && subCategories) {
    entries.map((entry: Entry, i: number) => {
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
  }

  // 4. Transform the array of numbers into an array of key:value pairs
  // matching up the name of the subcat with the value in the occurrences array.
  const occurrencesWithKey = occurrences.map((value, i) => ({
    key: subCategories[i].name,
    value: value,
  }));

  // 5. Compare the first and the second number. If the delta is a negative,
  // then the numbers are swapped. If they are even, then they stay the same.
  // Filtering is applied to the top 5
  const sortedOccurrences = occurrencesWithKey
    .sort((a, b) => b.value - a.value)
    .filter((a, i: number) => i < numberToDisplay);

  // Bar data
  const barData = {
    labels: sortedOccurrences
      ? sortedOccurrences.map((occurrence) => occurrence.key)
      : [],
    datasets: [
      {
        labels: "",
        data: sortedOccurrences
          ? sortedOccurrences.map((occurrence) => occurrence.value)
          : [],
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
      <div>
        <button
          onClick={() => {
            if (numberToDisplay < 7) {
              add();
            }
          }}
        >
          Up
        </button>
        {numberToDisplay}
        <button
          onClick={() => {
            if (numberToDisplay > 2) {
              subtract();
            }
          }}
        >
          Down
        </button>
      </div>

      {/* Render the most occurring subcategories.  So here we consume the subcategories */}
      {/* context. */}
      <Bar data={barData} options={options} />
    </>
  );
}
