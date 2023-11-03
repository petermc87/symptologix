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
  const [symptomSubcat, setSymptomSubcat] = useState<Array<string> | null>(
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
      Object.entries(mostOccurringState).forEach(([key, object]) => {
        const subcat = Object.keys(object)[0];
        const subcatValue = object[subcat];

        // Check if the subcategory matches the category and is a "Symptom"
        if (
          categories.some(
            (category) => category.id === key && category.name === "Symptom"
          )
        ) {
          // Check if the value is greater than the current value
          if (subcatValue > value) {
            subcatName = subcat;
            value = subcatValue;
            categoryId = key;
          }
        }
      });

      // Set the symptomSubcat with the found value
      setSymptomSubcat(subcatName);
    }
  }, [mostOccurringState, categories]);

  console.log(symptomSubcat);
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
                // // console.log(category);

                // //Cycle through the occurrences object.
                // if (mostOccurringState) {
                //   Object.entries(mostOccurringState).map(([key, object], i) => {
                //     // Separate and store the key(which is the name) of the object.
                //     subcatName = Object.keys(object)[0];
                //     value = object[subcatName];
                //     categoryId = key;

                //     // console.log(subcatName, category.id, categoryId);

                //     // If the ids match the the category.name is 'Symptom', then
                //     // save the variable.
                //     if (
                //       category.id === categoryId &&
                //       category.name === "Symptom"
                //     ) {
                //       // console.log("sdfgsdfgsdfg");
                //       // console.log(category.name, subcatName);
                //       return setSymptomSubcat(subcatName);
                //     }
                //   });
                // }

                return (
                  <>
                    <div key={category.id} className={styles.headingAndSubcat}>
                      <h5>{category.name}</h5>
                      <div className={styles.subcatWrapper}>
                        <div className={styles.subcat}>
                          {/* Add the category and value after it if it matches the category. */}
                          {symptomSubcat}
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
