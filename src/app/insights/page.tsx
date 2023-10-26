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
import GetEntries from "../../../actions/entryRequests/getEntries";
import { Category, Entry, Subcategory } from "../../../typings";
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
  const { logs, setLogs, categories, setCategories, entries, setEntries } =
    useContext<NavBarContextTypes | any>(NavBarContext);

  console.log(logs, categories, entries);

  // Get categories, subcategories and logs here in a useEffect hook.
  // Store this in state via the NavBarContext hook.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories: Category[] | undefined | null =
          await getCategories();
        setCategories(fetchedCategories);
        const fetchedEntries: Entry[] | undefined | null = await GetEntries();
        setEntries(fetchedEntries);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    return () => {};
  }, []);

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
                // Storing the occurances in an array to be read.
                let occurances: Array<string> = [];
                // Type declaration for subcatgories
                const filteretedSubCats: Subcategory[] | undefined =
                  category.subCategories;

                // Filtered subcats are mapped over.
                filteretedSubCats?.map((subcat) => {
                  occurances.push(
                    // The subcats are then matched up
                    // with the entries using a filter method.
                    entries.filter(
                      (entry: Entry) =>
                        // The filtering is applied to the entry that has
                        // a matching subCategoryId key:value. Also, so that
                        // each doughnut chart is segregated by category, match the
                        // category id with the categoryId key:value in each
                        // subcat.
                        entry.subCategoryId === subcat.id &&
                        subcat.categoryId === category.id
                    ).length
                  );
                });
                const data = {
                  // Set the labels as the subcategory names.
                  // Filter out the categrories here.
                  labels: category
                    ? // NOTE: Add an exlamantion point at to end to tell ts the Subcategories array is
                      // definitely defined.
                      filteretedSubCats!.map(
                        (subCategory: Subcategory) => subCategory.name
                      )
                    : "",

                  datasets: [
                    {
                      label: "# of occurances",
                      data: occurances,
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
