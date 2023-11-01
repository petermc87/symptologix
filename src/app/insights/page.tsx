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
import GetLogs from "../../../actions/logRequests/getLogs";
import getSubCategories from "../../../actions/subCategoryRequests/getSubCats";
import { Category, Entry, Log, Subcategory } from "../../../typings";
import {
  NavBarContext,
  NavBarContextTypes,
} from "../components/ContextNavBar/ContextNavBar";
import DiagnosisFlow from "../components/DiagnosisFlow/DiagnosisFlow";
import DottedLine from "../components/DottedLine/DottedLine";
import Footer from "../components/Footer/Footer";
import IndividualLogs from "../components/IndividualLogs/IndividualLogs";
import MostOccurring from "../components/MostOccurring/MostOccurring";
import NavBar from "../components/NavBar/NavBar";
import SolidLine from "../components/SolidLine/SolidLine";
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
    subCategories,
    setSubCategories,
    categories,
    setCategories,
    entries,
    setEntries,
    setLogs,
  } = useContext<NavBarContextTypes | any>(NavBarContext);

  // Get categories, subcategories and logs here in a useEffect hook.
  // Store this in state via the NavBarContext hook.
  // TASK: Improve the time complexity of this component (currently its O(n^2)):
  // 1. We are looping over each category
  // 2. We then loop over each subcat, match the id with the id of
  // the entries.
  // 3. A filter is applied to get all the matching entries. .length
  // is used to get the number of occurances. This is then pushed to to an
  // array.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories: Category[] = await getCategories();
        setCategories(fetchedCategories);
        const fetchedEntries: Entry[] = await GetEntries();
        setEntries(fetchedEntries);
        // Fetch subcategories to improve time complexity.
        const fetchedSubcats: Subcategory[] = await getSubCategories();
        setSubCategories(fetchedSubcats);
        const fetchedLogs: Log[] = await GetLogs();
        setLogs(fetchedLogs);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    return () => {};
  }, []);

  return (
    <>
      <NavBar />
      <div className={styles.pageWrapper}>
        <div className={styles.pageContainer} key={889}>
          <div className={styles.headingText}>Your Symptom Story</div>
          <>
            {/* Display the name of each category here. For each category,
          render a doughnut chart.
          */}
            {categories && entries
              ? categories.map((category: Category) => {
                  // Storing the occurances in an array to be read.
                  let occurances: Array<string> = [];
                  // Type declaration for subcatgories
                  const filteretedSubCats: Subcategory[] | undefined =
                    category.subCategories;

                  // Filtered subcats are mapped over.
                  filteretedSubCats?.map((subcat) => {
                    // NOTE: The # of occurances of subcats in the entries is added
                    // to an array so it can be displayed on a chart. We loop over using
                    // a map, filter out the matching entries, and use .length to count
                    // the number.
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
                        // NOTE: Make sure to make the else part of the ternary an empty array
                        // since that is the data type for labels and not string.
                        filteretedSubCats!.map(
                          (subCategory: Subcategory) => subCategory.name
                        )
                      : [],

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
                      <div className={styles.categoryName}>{category.name}</div>
                      <Doughnut data={data} />
                    </>
                  );
                })
              : ""}
          </>
          <br />
          <br />

          <div className={styles.lineWrapper}>
            <DottedLine />
          </div>
          <MostOccurring />
          <div className={styles.lineWrapper}>
            <DottedLine />
          </div>
          <IndividualLogs />
          <SolidLine />
          <DiagnosisFlow />
        </div>
      </div>
      <Footer />
    </>
  );
}
