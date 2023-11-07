import { Category } from "@prisma/client";
import { useContext, useEffect, useState } from "react";
import {
  NavBarContext,
  NavBarContextTypes,
} from "../ContextNavBar/ContextNavBar";
import FlowArrow from "../flowArrow/flowArrow";
import styles from "./DiagnosisFlow.module.scss";

// Set types for mostOccurring
type MostOccurringTypes = {
  [key: string]: {
    [key: string]: number;
  };
};

export default function DiagnosisFlow() {
  // Take on context for categories.

  const { categories, mostOccurringState } = useContext<
    NavBarContextTypes | any
  >(NavBarContext);

  // Storing different symptom matches.
  const [symptomSubcat, setSymptomSubcat] = useState<string | null>(null);

  const [placeOnBodySubcat, setPlaceOnBodySubcat] = useState<string | null>(
    null
  );
  const [todSubcat, setTodSubcat] = useState<string | null>(null);
  const [locationSubcat, setLocationSubcat] = useState<string | null>(null);
  const [environmentSubcat, setEnvironmentSubcat] = useState<string | null>(
    null
  );
  const [eventSubcat, setEventSubcat] = useState<string | null>(null);

  useEffect(() => {
    // Check if mostOccurringState and categories are available
    if (mostOccurringState && categories) {
      // Define variables for subcatName, value, and categoryId
      let subcatName: string | null = null;
      let value: number = 0;
      let categoryId: string | null = null;

      // Checking the types of mostOccurringState and categories before
      // accessing them.
      if (typeof mostOccurringState === "object" && Array.isArray(categories)) {
        // Iterate through mostOccurringState
        Object.entries(mostOccurringState).map(([key, object]) => {
          if (object) {
            subcatName = Object.keys(object)[0];
            value = object[subcatName];
          }

          // The current subcat CategoryId(key), filter the category out
          // from the array. If the name of that filtered cat is symptom,
          // pass in the subcatname.
          // console.log(categories);
          // console.log(subcatName, key);
          categoryId = key;
          // Set the symptomSubcat with the found value.
          // Make sure the key of the mostOccurring matches the
          // key of the cateogry.
          if (categories[0].id === categoryId) {
            setSymptomSubcat(subcatName);
          } else if (categories[2].id === categoryId) {
            setPlaceOnBodySubcat(subcatName);
          } else if (categories[3].id === categoryId) {
            setTodSubcat(subcatName);
          } else if (categories[4].id === categoryId) {
            setLocationSubcat(subcatName);
          } else if (categories[5].id === categoryId) {
            setEnvironmentSubcat(subcatName);
          } else {
            setEventSubcat(subcatName);
          }
        });
      }
    }
  }, [mostOccurringState, categories]);

  return (
    <>
      <div className={styles.flowWrapper}>
        <h1 className={styles.topHeading}>Diagnosis Flow</h1>
        {/* MAP FOR FIRST TWO */}

        {categories
          ? categories
              .filter(
                (filteredCategory: Category) =>
                  filteredCategory.name === "Symptom" ||
                  filteredCategory.name === "Place On Body"
              )
              .map((category: Category, i: number) => {
                return (
                  <>
                    <div key={category.id} className={styles.headingAndSubcat}>
                      <h5>{category.name}</h5>
                      <div className={styles.subcatWrapper}>
                        <div className={styles.subcat}>
                          {/* Add the category and value after it if it matches the category. */}
                          {/* Create a ternary that checks what symptom it is so that it renders the appropriate */}
                          {/* subcat. */}
                          {category.name === "Symptom" ? (
                            <>{symptomSubcat}</>
                          ) : (
                            <>{placeOnBodySubcat}</>
                          )}
                          {/* {symptomSubcat} */}
                        </div>
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
            ? categories
                .filter(
                  (filteredCategory: Category) =>
                    filteredCategory.name === "Time of Day" ||
                    filteredCategory.name === "Location" ||
                    filteredCategory.name === "Environment"
                )
                .map((category: Category) => {
                  return (
                    <div>
                      <h5>{category.name}</h5>{" "}
                    </div>
                  );
                })
            : ""}
        </div>
        <div className={styles.happensSubcats}>
          <div className={styles.subcatWrapper}>{todSubcat}</div>
          <div className={styles.subcatWrapper}>{locationSubcat}</div>
          <div className={styles.subcatWrapper}>{environmentSubcat}</div>
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
                        <div className={styles.subcat}>{eventSubcat}</div>
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
