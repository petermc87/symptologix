"use client";
import { useSession } from "next-auth/react";
import { ReactNode, useState } from "react";
import { Subcategory } from "../../../typings";
import NavBarProvider from "../components/ContextNavBar/ContextNavBar";
import Footer from "../components/Footer/Footer";
import InputForm from "../components/InputForm";
import LogForm from "../components/LogForm/Logform";
import LogSelection from "../components/LogSelection/LogSelection";
import NavBar from "../components/NavBar/NavBar";
import "../global.scss";
import styles from "./page.module.scss";

export default function Home() {
  // Passing in the session data for the user logged in or signed up.
  const { data, status } = useSession();

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

  // Get the current log refreshed. Use a handler function.
  // will get passed down to the log form. We dont need the setCurrentLogInProgress setter
  // because we are setting it here.
  return (
    <NavBarProvider>
      <NavBar />
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
                  <span
                    key={123}
                    onClick={() => {
                      setViewEntryForm(true);
                    }}
                  >
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
            {/* TASK: Make this a context state variable. Also, create a separate component for this. */}
            {viewEntryForm ? (
              <>
                <LogSelection userId={userData.user.id} />

                {/* Change this to the currentLog context. */}
                <InputForm
                  key={userData.user.id}
                  user={userData.user}
                  subCategories={subCategories}
                  setAllSubCategories={setAllSubCategories}
                />

                {/* Put the current log obejct state here and pass it down the InputForm and LogForm. */}
                <LogForm
                  key={userData.user.id + 1}
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

      <Footer />
    </NavBarProvider>
  );
}
