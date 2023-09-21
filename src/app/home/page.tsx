"use client";
import { useSession } from "next-auth/react";
import { ReactNode, useState } from "react";
import { Log } from "../../../typings";
import InputForm from "../components/InputForm";
import LogForm from "../components/LogForm/Logform";

export default function Home() {
  const { data, status } = useSession();

  // TODO: Create state for storing the log in progress. If there is a log in progress,
  // the the New Log button will dissappear below.
  const [currentLogInProgress, setCurrentLogInProgress] = useState<Log | null>(
    null
  );

  let userData: any;
  try {
    if (data && data !== undefined) {
      userData = data;
    }
  } catch (error: any) {
    console.error(error);
  }
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
            />
            <div>
              _________________________________________________________________________________
            </div>
            {/* Put the current log obejct state here and pass it down the InputForm and LogForm. */}
            <LogForm
              currentLogInProgress={currentLogInProgress}
              setCurrentLogInProgress={setCurrentLogInProgress}
            />
          </>
        )
      ) : (
        <div>Authentification Failed. Please try logging in again.</div>
      )}
    </>
  );
}
