"use client";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { Subcategory } from "../../../typings";
import {
  NavBarContext,
  NavBarContextTypes,
} from "../components/ContextNavBar/ContextNavBar";
import Footer from "../components/Footer/Footer";
import HeaderInfo from "../components/HeaderInfo/HeaderInfo";
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

  // // Create state for managing viewing the create category list items.
  // const [viewEntryForm, setViewEntryForm] = useState(false);

  // Consume context for the viewEntryForm
  const { viewEntryForm } = useContext<NavBarContextTypes | any>(NavBarContext);

  let userData: any;
  try {
    if (data && data !== undefined) {
      userData = data;
    }
  } catch (error: any) {
    console.error(error);
  }

  // Get the current log refreshed. Use a handler function.
  // will get passed down to the log form. We dont need the setCurrentLogInProgress setter
  // because we are setting it here.
  return (
    <>
      <NavBar />
      {status ? (
        status === "authenticated" &&
        data !== null && (
          // Turn this into a separate component.
          <div className={styles.homePageContainer}>
            {/* WELCOME HEADER */}
            <HeaderInfo userName={userData.user.username} />

            {/* ENTRY FORM */}
            {/* viewEntryForm when true will show all the components below whne the entry form hyperlink is clicked.
             */}
            {viewEntryForm ? (
              <>
                <LogSelection userId={userData.user.id} />
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
    </>
  );
}
