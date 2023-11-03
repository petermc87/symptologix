"use client";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  ChartData,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useSession } from "next-auth/react";
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
import NoDataMessage from "../components/NoDataMessage/NoDataMessage";
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

// Declare types for the doughnut data so that the type error
// for cutout is resolved.
type CustomChartData = {
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
    cutout: string; // Add the 'cutout' property here
  }[];
};

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
    logs,
    mostOccurringState,
    setMostOccurringState,
    mostOccurringCategories,
    setMostOccurringCategories,
  } = useContext<NavBarContextTypes | any>(NavBarContext);

  // Import the user session data so that it can be passed into
  // the getLogs function for filtering by user.
  const { data } = useSession<boolean>();

  // Store in a new variable to avoid type issues.
  let userId: string;

  if (data && typeof data.user.id === "string") {
    userId = data.user.id;
  }

  // Cycle through each of symptom subcategories in entries and see how
  // many times each appears. Store them in an object.

  // Find the logs matching the highest occurring subcategory
  // within the entry sub array.

  // See what other subcats appear the most/category.

  /// --> OPTIMIZE THIS FUNCITON!! <-- ///
  // Go to the last answer: https://chat.openai.com/c/b4d63c4b-95d7-4d12-b76c-f7ad6f3f4836
  const handleHighestOccurrence = () => {
    // For storing all the subcat occurrences
    let occurrences: { [key: string]: any } = {};

    // --> 1.  Get the category named symptom <-- //
    let symptom: Category;

    if (categories) {
      symptom = categories.filter(
        (category: Category) => category.name === "Symptom"
      );

      // --> 2. Cycle through each subcat within the Symptom cat. <-- //
      symptom[0].subCategories.map((subcat: Subcategory) => {
        if (entries) {
          // --> 3. Filter entries that match the subcatIds in Symptom category and create an occurrance for each. <-- //
          const filteredEntries = entries.filter(
            (entry: Entry) => entry.subCategoryId === subcat.id
          );

          // Cycle through each filtered entry and add to occurences object
          filteredEntries.map((entry: Entry) => {
            // Make sure we are matching up the subcats before adding
            // to the occurrences object.
            if (entry.subCategoryId === subcat.id) {
              // Adding a 1 to the number of subcats if there
              // already exisits one.
              if (occurrences[subcat.id]) {
                occurrences[subcat.id]++;
              } else {
                // If this does not already exist after looping, make
                // it just one.
                occurrences[subcat.id] = 1;
              }
            }
          });
        }
      });
    }

    // --> 4. Sort the occurrences in descending order. <-- //
    const sortedObject = Object.keys(occurrences)
      .sort((a, b) => occurrences[b] - occurrences[a])
      .reduce((obj, key: string) => {
        // Make the current sorted key:value by equal to
        // to the key:value in the occurrences object.
        obj[key] = occurrences[key];
        return obj;
      }, {});

    let filteredLogs: Log[] = [];

    // --> 5. Find the logs that have the highest occurring symtpom SubCat in the Entries. <-- //
    Object.entries(sortedObject).map(([key, value], i) => {
      // console.log(key, value)
      // Only the top 2
      if (i <= 0) {
        // Filter the logs.
        if (logs) {
          filteredLogs = logs.filter((log: Log | undefined) => {
            // We use the .some to check if the
            // array of entries includes the subcat.
            if (log && log.entries) {
              return log.entries.some((entry) => entry.subCategoryId === key);
            }
          });
        }
      }
    });

    // --> 6. Put all the entries relative to the most occuring symptom into an array. <-- //
    let filteredEntriesForMostOccurring: Entry[] = [];
    // Cycle through each log return the id of each.
    filteredLogs.map((log: Log) => {
      if (log && log.entries) {
        filteredEntriesForMostOccurring.push(log.entries);
      }
    });
    // Create another object of the most occurring entries connected to
    // that symptom.
    let mostOccurring: { [key: string]: any } = {};

    // --> 7. Cycle through each filtered entry and add to occurences object <-- //

    // TASK:  TO OMPTIMIZE, USE REDUCE INSTEAD OF AN ORIGINAL MAPPING
    // FUNCTION
    // SO THAT ALL ENTRIES ARE CONSIDERED IN ONE PASS.
    // https://chat.openai.com/c/4ccd89cf-0447-4daa-acbb-29d3596b42f1

    filteredEntriesForMostOccurring.map((entries: any) => {
      entries.map((entry: Entry) => {
        if (mostOccurring[entry.subCategoryId]) {
          mostOccurring[entry.subCategoryId]++;
        } else {
          // If this does not already exist after looping, make
          // it just one.
          mostOccurring[entry.subCategoryId] = 1;
        }
      });
    });

    let separateCategories: Array<string> = [];

    // Create an updated most occurring object.
    let updatedMostOccurring: { [key: string]: any } = {};
    if (subCategories) {
      // --> 8. Find out if it is in the subcats.
      subCategories.map((subcat: Subcategory) => {
        if (entries) {
          Object.entries(mostOccurring).map(([key, value], i) => {
            if (key === subcat.id) {
              // console.log(subcat.categoryId, subcat.name);
              updatedMostOccurring[subcat.categoryId] = {
                [subcat.name]: value,
              };
              separateCategories.push(subcat.categoryId);
            }
          });
        }
      });
      setMostOccurringState(updatedMostOccurring);
      setMostOccurringCategories(separateCategories);
    }
  };

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
        const fetchedLogs: Log[] = await GetLogs(userId);
        setLogs(fetchedLogs);

        // If the data is available, then call the occurrence function here.
        if (
          fetchedEntries &&
          fetchedCategories &&
          fetchedSubcats &&
          fetchedLogs
        ) {
          handleHighestOccurrence();
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    return () => {};
  }, []);
  // console.log(entries, categories, subCategories, logs);

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
              ? categories.map((category: Category, i: number) => {
                  // Storing the occurances in an array to be read.
                  let occurances: Array<number> = [];
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
                          subcat.categoryId === category.id &&
                          entry.userId === userId
                      ).length
                    );
                  });

                  // Dataset for the doughnut.
                  // NOTE: We are also adding types for the 'dataset', which
                  // is declared above.
                  let data: ChartData<"doughnut", number[], unknown> &
                    CustomChartData;

                  if (occurances.some((item) => item !== 0)) {
                    data = {
                      // Set the labels as the subcategory names.
                      // Filter out the categrories here.
                      labels:
                        category && filteretedSubCats
                          ? // NOTE: Add an exlamantion point at to end to tell ts the Subcategories array is
                            // definitely defined.
                            // NOTE: Make sure to make the else part of the ternary an empty array
                            // since that is the data type for labels and not string.
                            filteretedSubCats.map(
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
                    // Handle the case when there is no data. Make the
                    // data objects equal to blank arrays.
                  } else {
                    data = {
                      labels: [],
                      datasets: [],
                    };
                    // Generating message to the screen only once.
                    if (i === 0) {
                      return (
                        <NoDataMessage data="You do not have any data to show yet. Please go to new logs page to create a log." />
                      );
                    } else {
                      return "";
                    }
                  }

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
