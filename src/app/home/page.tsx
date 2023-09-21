"use client";
import { useSession } from "next-auth/react";
import { ReactNode, useState } from "react";
import { Log, Subcategory } from "../../../typings";
import InputForm from "../components/InputForm";
import LogForm from "../components/LogForm/Logform";

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
      {status ? (
        status === "authenticated" &&
        data !== null && (
          <>
            <h2>Welcome {userData.user.username as ReactNode}</h2>
            <p>User ID: {userData.user.id as ReactNode}</p>
            <InputForm
              user={userData.user}
              currentLogInProgress={currentLogInProgress}
              setCurrentLogInProgress={setCurrentLogInProgress}
              subCategories={subCategories}
              setAllSubCategories={setAllSubCategories}
            />
            <div>
              _________________________________________________________________________________
            </div>
            {/* Put the current log obejct state here and pass it down the InputForm and LogForm. */}
            <LogForm
              currentLogInProgress={currentLogInProgress}
              setCurrentLogInProgress={setCurrentLogInProgress}
              subCategories={subCategories}
            />
          </>
        )
      ) : (
        <div>Authentification Failed. Please try logging in again.</div>
      )}
    </>
  );
}
