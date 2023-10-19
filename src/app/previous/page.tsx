"use client";
import { useEffect, useState } from "react";
import getLogs from "../../../actions/logRequests/getLogs";
import { Log } from "../../../typings";
import NavBarProvider from "../components/ContextNavBar/ContextNavBar";
import Footer from "../components/Footer/Footer";
import LogList from "../components/LogList/LogList";
import LogView from "../components/LogView/LogView";
import NavBar from "../components/NavBar/NavBar";
import styles from "./page.module.scss";
export default function PreviousLogsPage() {
  // State for holding all the logs previously submitted.
  const [logsState, setLogsState] = useState<Log[] | null | void | undefined>(
    null
  );

  // Fetch logs and subcategories.
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const fetchedLogs: Log[] | void | null = await getLogs(); // Assuming getLogs is defined elsewhere
        setLogsState(fetchedLogs);
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
      <NavBarProvider>
        <NavBar />
        {/* We open the log here and view what was previously submitted.
            This can then be edited via a redirect to the home page. The current log
            in progress will be replaced by the log selected for editing. */}
        {/* Add the ref to the html element so that it can be closed when clicking  */}
        {/* outside of the log. */}
        <LogView />
        <div className={styles.previousPageContainer} key={889}>
          <div className={styles.headingText}>Select from Previous Logs</div>
          <>
            {/* TASK: 
              1. Create a separate component for this 
              2. Set the context for currentLog.
              3. This can then be used on the LogVew componenet.
              4. Delete selectedLog. Also, make sure to change the selected
              log references in LogView to currentLog.
            */}
            <LogList logsState={logsState} />
          </>
        </div>
        <Footer />
      </NavBarProvider>
    </>
  );
}
