"use client";
import { useSession } from "next-auth/react";
import { ReactNode, useState } from "react";
import { Button } from "react-bootstrap";
import submitNewLog from "../../../actions/logRequests/submitNewLog";
import { Log, Subcategory } from "../../../typings";
import InputForm from "../components/InputForm";
import LogForm from "../components/LogForm/Logform";
import styles from "./page.module.scss";

export default function Home() {
  const { data, status } = useSession();

  // State for storing the log in progress. If there is a log in progress,
  // the the New Log button will dissappear below.
  const [currentLogInProgress, setCurrentLogInProgress] = useState<Log | null>(
    null
  );

  // State for storing all subCategories that were previously created
  // for that category.
  // NOTE: These props are at the top level so that they can be used in LogForm
  // as well as the general input form.
  const [subCategories, setAllSubCategories] = useState<Subcategory[]>([]);

  // Create state for managing viewing the create category list items.
  const [viewEntryForm, setViewEntryForm] = useState(false);

  let userData: any;
  try {
    if (data && data !== undefined) {
      userData = data;
    }
  } catch (error: any) {
    console.error(error);
  }

  //Creating a readable variable for ssubmittign the new log.
  let userId: string;
  if (userData) {
    userId = userData.user.id;
  }

  // Submitting  new log to the database.
  const handleSubmitLog = async (e: any) => {
    e.preventDefault();
    try {
      if (userId) {
        const currentLog: Log = await submitNewLog(userId);
        setCurrentLogInProgress(currentLog);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // Get the current log refreshed. Use a handler function.
  // will get passed down to the log form. We dont need the setCurrentLogInProgress setter
  // because we are setting it here.
  return (
    <>
      {status ? (
        status === "authenticated" &&
        data !== null && (
          <div className={styles.homePageContainer}>
            {/* WELCOME HEADER */}
            <div className={styles.welcomeHeader}>
              <h2 className={styles.intro}>
                Welcome <span>{userData.user.username as ReactNode}!</span>
              </h2>
              {/* Heading text will not be visible when the entryform is active */}
              {!viewEntryForm ? (
                <div className={styles.heading}>
                  Create new {/* Add state here to show the whole entry form */}
                  <span key={123} onClick={() => setViewEntryForm(true)}>
                    entry form
                  </span>
                  , look at <span>metrics</span>, or <span>previous logs</span>
                </div>
              ) : (
                ""
              )}
            </div>

            {/* ENTRY FORM */}
            {/* viewEntryForm when true will show all the components below whne the entry form hyperlink is clicked.
             */}

            {viewEntryForm ? (
              <>
                <div className={styles.entryForm}>
                  {currentLogInProgress === null ? (
                    <div className={styles.selection}>
                      <div className={styles.createWrapper}>
                        <p>Create new Log:</p>
                        <Button
                          key={123}
                          onClick={(e: any) => handleSubmitLog(e)}
                          variant="primary"
                          id={styles.button}
                        >
                          Create Log
                        </Button>
                      </div>

                      <div className={styles.textWrapper}>
                        <span>OR </span>
                        <div></div>
                      </div>
                      <div
                        className={styles.createWrapper}
                        id={styles.openPrevious}
                      >
                        <p>Open Previous</p>
                        <span>
                          <p>12/10/2023</p>
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <InputForm
                    key={userData.user.id}
                    user={userData.user}
                    currentLogInProgress={currentLogInProgress}
                    setCurrentLogInProgress={setCurrentLogInProgress}
                    subCategories={subCategories}
                    setAllSubCategories={setAllSubCategories}
                  />
                </div>

                {/* Put the current log obejct state here and pass it down the InputForm and LogForm. */}
                <LogForm
                  key={userData.user.id + 1}
                  currentLogInProgress={currentLogInProgress}
                  setCurrentLogInProgress={setCurrentLogInProgress}
                  subCategories={subCategories}
                />
              </>
            ) : (
              ""
            )}
          </div>
        )
      ) : (
        <div>Authentification Failed. Please try logging in again.</div>
      )}
    </>
  );
}
