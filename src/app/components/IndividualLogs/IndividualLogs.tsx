import { useContext, useEffect, useState } from "react";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import { Entry, Subcategory } from "../../../../typings";
import {
  NavBarContext,
  NavBarContextTypes,
} from "../ContextNavBar/ContextNavBar";
import styles from "./IndividualLogs.module.scss";

export default function IndividualLogs() {
  // Add in the subcategory data through context so that
  // it can be consumed here.
  const { subCategories, setSubCategories, entries, setEntries } = useContext<
    NavBarContextTypes | any
  >(NavBarContext);

  // Filtering words list.
  const filterWords = [
    "this",
    "they",
    "them",
    "feeling",
    "with",
    "place",
    "big",
    "ass",
    "the",
  ];

  // State for holding the selected subcategory
  const [selectedSubCat, setSeletedSubCat] = useState<Subcategory | null>(null);

  // State for filtering the entries based on the selected subcat.
  const [filteredEntries, setSelectedEntries] = useState<
    Entry[] | null | undefined
  >();

  // State for holding the number of occurrences
  const [occurrences, setOccurrences] = useState<{ [key: string]: any } | null>(
    null
  );

  const handleFilterWords = () => {
    // For storing all the words.
    let occurrences: { [key: string]: any } = {};
    // Checking if the filtered entries have
    // common words and how many occurrences.
    if (filteredEntries) {
      filteredEntries.map((entry: Entry | null) => {
        // NOTE: To ensure entry.entry is only accessed when
        // it definitely is not null, perform a check. This
        // will remove any type errors.
        // Split the sentence into words.
        if (entry !== null && entry.entry !== null) {
          const words = entry.entry.split(" ");

          // Count the occurrences.
          words.map((word) => {
            // If a word exists in the occurrences object.
            if (occurrences[word]) {
              // Then iterate up one the :value for that pair.
              occurrences[word]++;
            } else {
              // Otherwise, there are no repeating words for
              // the current word. Therefore there is only one.
              occurrences[word] = 1;
            }
          });
        }
      });
    }
    setOccurrences(occurrences);
  };

  // Filter out entries matching the id of the selected subcat.
  const handleFilterEntries = (subCat: Subcategory) => {
    setSeletedSubCat(subCat);
    const filtereEntries = entries.filter(
      (entry: Entry) => entry.subCategoryId === subCat.id
    );
    setSelectedEntries(filtereEntries);
    handleFilterWords();
  };

  // useEffect will update the filteredEntries array on change
  // so that we are not displaying the previous state.
  useEffect(() => {
    handleFilterWords();
  }, [filteredEntries]);

  return (
    <>
      {/* Add a dropdown to select a current subcategory */}
      <div className={styles.heading}>Individual Entry Patterns</div>
      <div>
        <div className={styles.headerInfo}>
          <div className={styles.subHeadingTop}>Select SubCategory</div>
          <Dropdown as={ButtonGroup}>
            {/* DROPDOWN TOGGLE BUTTON. */}
            <Dropdown.Toggle
              id="dropdown-custom-1"
              style={{
                backgroundColor: "#9391ff",
                borderColor: "#9391ff",
                zIndex: "0",
                padding: "0 5px 0 5px",
              }}
            >
              {/* Text in the subcategory dropdown. This will show the default if nothing is selected */}
              {selectedSubCat ? selectedSubCat.name : "Select a Subcategory"}
            </Dropdown.Toggle>
            {/* DROPDOWN MENU ITEMS. */}
            <Dropdown.Menu className="super-colors">
              {subCategories
                ? subCategories.map((subCat: Subcategory, i: number) => {
                    return (
                      <Dropdown.Item
                        eventKey={i}
                        key={i}
                        onClick={() => {
                          handleFilterEntries(subCat);
                        }}
                      >
                        {subCat.name}
                      </Dropdown.Item>
                    );
                  })
                : ""}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Show a table with the description and occurrences */}
        <div className={styles.logContainer}>
          <h2>Most Common Key Words</h2>
          <div className={styles.entryContainer}>
            <div className={styles.subCat} id={styles.subHeading}>
              Description
            </div>
            <div className={styles.entry} id={styles.subHeading}>
              Occurrence
            </div>
          </div>
          {/* Create a map function that will return all filtered words  */}
          {/* with the highest occurrence. */}
          {/* NOTE: Because this is an object, to map we have to take */}
          {/* each individual entry and map the key value of each. */}
          {occurrences
            ? Object.entries(occurrences).map(([key, value]) => {
                return (
                  <>
                    <div className={styles.entryContainer}>
                      {key.length > 2 && !filterWords.includes(key) ? (
                        <>
                          <div className={styles.subcat}>{key}</div>
                          <div className={styles.entry}>{value}</div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                );
              })
            : "Nothing to display yet"}
        </div>
      </div>
    </>
  );
}
