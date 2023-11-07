import { Category } from "@prisma/client";
import { useContext, useEffect, useState } from "react";
import {
  NavBarContext,
  NavBarContextTypes,
} from "../ContextNavBar/ContextNavBar";
import FlowArrow from "../flowArrow/flowArrow";
import styles from "./DiagnosisFlow.module.scss";

export default function DiagnosisFlow() {
  // Take on context for categories.

  const {
    categories,
    entries,
    subCategories,
    logs,
    mostOccurringState,
    mostOccurringCategories,
  } = useContext<NavBarContextTypes | any>(NavBarContext);

  // Holding symptom and place on body state
  const [symptomSubcat, setSymptomSubcat] = useState<string | null>(null);

  const [placeOnBodySubcat, setPlaceOnBodySubcat] = useState<string | null>(
    null
  );
  const [todSubcat, setTodSubcat] = useState<string | null>(null);
  const [locationSubcat, setLocationSubcat] = useState<string | null>(null);
  const [environmentSubcat, setEnvironmentSubcat] = useState<string | null>(
    null
  );

  useEffect(() => {
    // Check if mostOccurringState and categories are available
    if (mostOccurringState && categories) {
      // Define variables for subcatName, value, and categoryId
      let subcatName: string | null = null;
      let value: number = 0;
      let categoryId: string | null = null;

      // Iterate through mostOccurringState
      Object.entries(mostOccurringState).map(([key, object]) => {
        subcatName = Object.keys(object)[0];
        value = object[subcatName];

        // The current subcat CategoryId(key), filter the category out
        // from the array. If the name of that filtered cat is symptom,
        // pass in the subcatname.
        // console.log(categories);
        // console.log(subcatName, key);

        categoryId = key;
        // Set the symptomSubcat with the found value.
        // Make sure the key of the mostOccurring matches the
        // key of the cateogry.
        // console.log(categories[0].id, categoryId);
        console.log(categories);
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
        }
      });
    }
  }, [mostOccurringState, categories]);

  console.log(symptomSubcat, placeOnBodySubcat);
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

// ? categories.map((category: Category, i: number) => {
//     // Separating out styling by category.

//     if (
//       category.name === "Place On Body" ||
//       category.name === "Symptom"
//     ) {
//       console.log(category.id);
//       // category.subCategories.filter((subcat) => subcat.id)
//       console.log(mostOccurringState);
//       //  Cycle through the occurrences object.
//       if (mostOccurringState) {
//         Object.entries(mostOccurringState).map(([key, object], i) => {
//           // Separate and store the key(which is the name) of the object.
//           subcatName = Object.keys(object)[0];

//           value = object[subcatName];

//           categoryId = key;

//           // // console.log(categoryId, subcatName, value, category.name);

//           // console.log(retrievedId, category.name, categoryId);

//           // console.log(category);

//           // // Current name is 'Symptom' and the ids match up, store
//           // // the symptomcatname.

//           // if (
//           //   (retrievedId = categoryId && category.name === "Symptom")
//           // ) {
//           //   console.log("hkhjkjkhjkhk");
//           // }

//           // if (
//           //   category.name === "Symptom" &&
//           //   categoryId === category.id
//           // ) {
//           //   console.log("HERJKGHJKHKHDJKSH");
//           //   // symptomObject = subcatName;
//           // }

//           // //Filter out the subcategories in the occurrences object that
//           // // match with the subcats in the category object.

//           // const filteredSubcats: Subcategory[] =
//           //   category.subCategories.filter(
//           //     (subcat: Subcategory) => subcat.id === key
//           //   );

//           // // Only considering the subcat occurring the most.
//           // if (filteredSubcats && value > highestValue) {
//           //   highestValue = value;
//           //   // console.log(category.name, filteredSubcats[0], value);

//           //   // Store the filteredSubcat here
//           //   filteredSubcat = filteredSubcats[0];
//           //   console.log(category.name, filteredSubcat);
//           // }
//         });
