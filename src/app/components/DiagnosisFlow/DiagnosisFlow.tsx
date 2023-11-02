import { Category } from "@prisma/client";
import { useContext } from "react";
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

  // Search through each subcategory in each category to find a match. The
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
