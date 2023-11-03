"use client";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import getLogs from "../../../actions/logRequests/getLogs";
import { Log } from "../../../typings";
import {
  NavBarContext,
  NavBarContextTypes,
} from "../components/ContextNavBar/ContextNavBar";
import Footer from "../components/Footer/Footer";
import LogList from "../components/LogList/LogList";
import LogView from "../components/LogView/LogView";
import NavBar from "../components/NavBar/NavBar";
import NoDataMessage from "../components/NoDataMessage/NoDataMessage";
import styles from "./page.module.scss";
export default function PreviousLogsPage() {
  // Context for logs
  const { setLogs, logs } = useContext<NavBarContextTypes | any>(NavBarContext);

  // Import the user session data so that it can be passed into
  // the getLogs function for filtering by user.
  const { data } = useSession<any>();

  // Store in a new variable to avoid type issues.
  let userData: any;
  try {
    if (data && data !== undefined) {
      userData = data;
    }
  } catch (error: any) {
    console.error(error);
  }

  // Fetch logs and subcategories.
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const fetchedLogs: Log[] | void | null = await getLogs(
          userData?.user.id
        ); // Assuming getLogs is defined elsewhere
        setLogs(fetchedLogs);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <>
      {/*  We add the subCategory global availability in the use context provider. */}
      <NavBar />
      {/* We open the log here and view what was previously submitted.
            This can then be edited via a redirect to the home page. The current log
            in progress will be replaced by the log selected for editing. */}
      {/* Add the ref to the html element so that it can be closed when clicking  */}
      {/* outside of the log. */}
      <LogView />
      <div className={styles.pageContainer} key={889}>
        <div className={styles.headingText}>Select from Previous Logs</div>
        <>
          {logs && logs.length !== 0 ? (
            <>
              <LogList />
            </>
          ) : (
            <NoDataMessage
              data="No logs to display yet. Please go to new logs page above to create
            one."
            />
          )}
        </>
      </div>
      <Footer />
    </>
  );
}
