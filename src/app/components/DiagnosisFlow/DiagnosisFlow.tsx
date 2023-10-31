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

  const { categories } = useContext<NavBarContextTypes | any>(NavBarContext);

  console.log(categories);
  return (
    <>
      <div className={styles.flowWrapper}>
        <h1 className={styles.topHeading}>Diagnosis Flow</h1>
        {categories
          ? categories.map((category: Category) => {
              if (category.name !== "Event/Conflict")
                return (
                  <>
                    <div className={styles.headingAndSubcat}>
                      {/* Return the symptom and place on body to
                   the screen normally and the following three */}
                      <h5>{category.name}</h5>
                      {/* Add another div here to respresent the highest
                    occurring smyptom first.
                    */}
                      <div className={styles.subcatWrapper}>
                        <div className={styles.subcat}>Placeholder</div>
                      </div>
                      <div className={styles.dummy}></div>
                    </div>
                    <FlowArrow />
                  </>
                );
            })
          : ""}
      </div>
    </>
  );
}
