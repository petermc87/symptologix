import { Category } from "@prisma/client";
import { useContext } from "react";
import { Entry, Log, Subcategory } from "../../../../typings";
import {
  NavBarContext,
  NavBarContextTypes,
} from "../ContextNavBar/ContextNavBar";
import FlowArrow from "../flowArrow/flowArrow";
import styles from "./DiagnosisFlow.module.scss";

export default function DiagnosisFlow() {
  // Take on context for categories.

  const { categories, entries, subCategories, logs } = useContext<
    NavBarContextTypes | any
  >(NavBarContext);

  console.log(entries, subCategories, logs, categories);

  // Cycle through each of symptom subcategories in entries and see how
  // many times each appears. Store them in an object.

  // Find the logs matching the highest occurring subcategory
  // within the entry sub array.

  // See what other subcats appear the most/category.
  const handleHighestOccurrence = () => {
    // For storing all the subcat occurrences
    let occurrences: { [key: string]: any } = {};

    // --> 1.  Get the category named symptom <-- //
    const symptom = categories.filter(
      (category: Category) => category.name === "Symptom"
    );

    // --> 2. Cycle through each subcat within the Symptom cat. <-- //
    symptom[0].subCategories.map((subcat: Subcategory) => {
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
    });

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
        filteredLogs = logs.filter((log: Log | undefined) => {
          // We use the .some to check if the
          // array of entries includes the subcat.
          if (log && log.entries) {
            return log.entries.some((entry) => entry.subCategoryId === key);
          }
        });
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

    let separateCategories: Category[] = [];
    // --> 8. Find out if it is in the subcats.
    subCategories.map((subcat: Subcategory) => {
      Object.entries(mostOccurring).map(([key, value], i) => {
        if (key === subcat.id) {
          mostOccurring[subcat.name] = value;
          separateCategories.push(subcat.categoryId);
        }
      });
    });
    console.log(mostOccurring);
    console.log(separateCategories);
  };

  return (
    <>
      <div className={styles.flowWrapper}>
        <h1 className={styles.topHeading}>Diagnosis Flow</h1>
        {/* MAP FOR FIRST TWO */}
        {categories
          ? categories.map((category: Category, i: number) => {
              // Separating out styling by category.
              if (
                category.name === "Place On Body" ||
                category.name === "Symptom"
              )
                return (
                  <>
                    {/* use a ternary to only the display the flow sections that are */}
                    {/* not either location, environemnt or time of day. This is to  */}
                    {/* separate the styling. */}

                    <div key={category.id} className={styles.headingAndSubcat}>
                      {/* Return the symptom and place on body to
                       the screen normally and the following three */}
                      <h5>{category.name}</h5>
                      {/* Add another div here to respresent the highest
                        occurring smyptom first.*/}

                      <div className={styles.subcatWrapper}>
                        <div className={styles.subcat}>Placeholder</div>
                      </div>
                      <div className={styles.dummy}></div>
                    </div>
                    <FlowArrow />
                    {/* Subheading betwen the arrows are going to be 'EFFECTS' and */}
                    {/* 'HAPPENS' respectively. Use a ternary and i (iterator) to  */}
                    {/* determine which one the render. */}
                    {i === 0 ? (
                      <div className={styles.subHeading}>
                        <h2>EFFECTS</h2>
                      </div>
                    ) : (
                      <div className={styles.subHeading}>
                        <h2>HAPPENS</h2>
                      </div>
                    )}
                    <FlowArrow />
                  </>
                );
            })
          : ""}
        {/* MAP FOR INLINE ELEMENTS */}
        <div className={styles.happensWrapper}>
          {categories
            ? categories.map((category: Category) => {
                //Filtering out the three categories to be lined in a row.
                if (
                  category.name === "Environment" ||
                  category.name === "Location" ||
                  category.name === "Time of Day"
                ) {
                  return (
                    <div>
                      <h5>{category.name}</h5>{" "}
                    </div>
                  );
                }
              })
            : ""}
        </div>
        <div className={styles.happensSubcats}>
          <div className={styles.subcatWrapper}>Placeholder</div>
          <div className={styles.subcatWrapper}>Placeholder</div>
          <div className={styles.subcatWrapper}>Placeholder</div>
        </div>
        <FlowArrow />
        <div className={styles.subHeading}>
          <h2>COULD BE RELATED TO</h2>
        </div>
        <FlowArrow />
        {/* MAP FOR EVENT/CONFLICT */}
        {categories
          ? categories.map((category: Category) => {
              if (category.name === "Event/Conflict") {
                return (
                  <>
                    <div key={category.id} className={styles.headingAndSubcat}>
                      {/* Return the symptom and place on body to
                                       the screen normally and the following three */}
                      <h5>{category.name}</h5>
                      {/* Add another div here to respresent the highest
                                        occurring smyptom first.*/}
                      <div className={styles.subcatWrapper}>
                        <div className={styles.subcat}>Placeholder</div>
                      </div>
                      <div className={styles.dummy}></div>
                    </div>
                  </>
                );
              }
            })
          : ""}
      </div>
    </>
  );
}
