"use client";
import { useEffect, useRef, useState } from "react";
import getLogs from "../../../actions/logRequests/getLogs";
import { Log } from "../../../typings";
import NavBarProvider from "../components/ContextNavBar/ContextNavBar";
import Footer from "../components/Footer/Footer";
import LogView from "../components/LogView/LogView";
import NavBar from "../components/NavBar/NavBar";
import styles from "./page.module.scss";
export default function PreviousLogsPage() {
  // State for holding all the logs previously submitted.
  const [logsState, setLogsState] = useState<Log[] | null | void | undefined>(
    null
  );

  //   State for holding the selected log.
  const [selectedLog, setSelectedLog] = useState<Log | null | undefined>(null);

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

  // Create reference to the element that will close
  //   when clicked outside of it.
  const ref = useRef<HTMLDivElement>(null);

  //Create click outside functionality
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && ref.current.contains(event.target as Node)) {
        setSelectedLog(null);
      }
    }
    // Bind to event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  //   if (selectedLog) console.log(selectedLog);

  return (
    <>
      <NavBarProvider>
        <NavBar />
        <div className={styles.previousPageContainer} key={889}>
          <div className={styles.headingText}>Select from Previous Logs</div>
          <>
            {logsState?.map((log: Log) => {
              return (
                <>
                  <div
                    className={styles.previousLogContainer}
                    onClick={() => {
                      if (log) setSelectedLog(log);
                    }}
                    key={log.id}
                  >
                    <div className={styles.overlay} key={log.id}>
                      Click to view
                    </div>
                    <h2>{log.createdAt?.toDateString()}</h2>
                    <h2>{log.createdAt?.toLocaleTimeString()}</h2>
                  </div>
                </>
              );
            })}
          </>
        </div>

        <Footer />
        {/* We open the log here and view what was previously submitted.
            This can then be edited via a redirect to the home page. The current log
            in progress will be replaced by the log selected for editing. */}
        {/* Add the ref to the html element so that it can be closed when clicking  */}
        {/* outside of the log. */}
        {selectedLog ? (
          <>
            {/* TASK: Create a useContext hook that will store state globally. */}
            <LogView
              selectedLog={selectedLog}
              setSelectedLog={setSelectedLog}
            />
          </>
        ) : (
          ""
        )}
      </NavBarProvider>
    </>
  );
}
