// Imports
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useContext, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import getSubCategories from "../../../../actions/subCategoryRequests/getSubCats";
import { Entry, Log, Subcategory } from "../../../../typings";
import { NavBarContext } from "../ContextNavBar/ContextNavBar";
import styles from "./LogView.module.scss";

type LogViewTypes = {
  currentLog: Log;
  setCurrentLog: Dispatch<SetStateAction<Log | null | undefined>>;
  subCategories: Subcategory[] | null | undefined;
  setSubCategories: Dispatch<SetStateAction<Subcategory[] | null | undefined>>;
};

export default function LogView() {
  // Consume the context for subcategories so it can be viewed for each entry.
  const { subCategories, setSubCategories, currentLog, setCurrentLog } =
    useContext<LogViewTypes | any>(NavBarContext);

  // Create a function that will cycle through the subcats and match with the
  // current entry.
  let subCat: string;
  const handleMatchingSubCat = (id: string) => {
    subCategories.map((category: Subcategory) => {
      //   console.log(category, id);
      if (category.id === id) {
        subCat = category.name;
      }
    });
  };

  // Retrieve subcategories on view.
  useEffect(() => {
    const fetchSubcats = async () => {
      try {
        const fetchSubcats: Subcategory[] | null | void =
          await getSubCategories();
        setSubCategories(fetchSubcats);
      } catch (error) {
        console.error("Error fetching sub categories", error);
      }
    };
    fetchSubcats();
    return () => {};
  }, []);

  //Create click outside functionality
  // Add in the code for the ref handler for clicking outside to close.
  // Create reference to the element that will close
  // when clicked outside of it.
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setCurrentLog(null);
      }
    }
    // Bind to event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  // Page routing.
  const router = useRouter();

  return (
    <>
      {currentLog ? (
        <div className={styles.logView} key={currentLog.id}>
          <div ref={ref} className={styles.logContainer}>
            <h2 className={styles.headingText}>Log View</h2>
            <p className={styles.dateTime}>
              {" "}
              {currentLog.createdAt?.toLocaleDateString()}
              {", "}
              {currentLog.createdAt?.toLocaleTimeString()}
            </p>

            <br />
            <br />
            <div className={styles.entryContainer}>
              <div className={styles.subcat} id={styles.subHeading}>
                SubCategory
              </div>
              <div className={styles.entry} id={styles.subHeading}>
                Entry
              </div>
            </div>
            {currentLog.entries?.map((entry: Entry) => {
              // Finding the matching subcat.
              handleMatchingSubCat(entry.subCategoryId);
              return (
                <div className={styles.entryContainer} key={entry.id}>
                  <div className={styles.subcat}>{subCat}</div>
                  <div className={styles.entry}>{entry.entry}</div>
                </div>
              );
            })}
            {/* // Clicking this will pass the current log into context to be used */}
            {/* in the home page for editing. */}

            {/* Create a redirect to the home page where the currentLog will be  */}
            {/* displayed at the bottom for editing. */}
            <Link href={"/home"}>
              <Button>Edit</Button>
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
