import { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import GetLogs from "../../../../actions/logRequests/getLogs";
import submitNewLog from "../../../../actions/logRequests/submitNewLog";
import { Log } from "../../../../typings";
import {
  NavBarContext,
  NavBarContextTypes,
} from "../ContextNavBar/ContextNavBar";
import styles from "./LogSelection.module.scss";

type LogSelectionTypes = {
  userId: string;
};

export default function LogSelection({ userId }: LogSelectionTypes) {
  const { currentLog, setCurrentLog, logs, setLogs } = useContext<
    NavBarContextTypes | any
  >(NavBarContext);

  // Submitting  new log to the database.
  const handleSubmitLog = async (e: any) => {
    e.preventDefault();
    try {
      if (userId) {
        const log: Log = await submitNewLog(userId);
        setCurrentLog(log);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Get all the logs and filter out the top result i.e the latest.
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const logs: Log[] | null = await GetLogs(userId);
        setLogs(logs);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLogs();
  }, []);

  return (
    <>
      {currentLog === null ? (
        <div className={styles.entryForm}>
          <div className={styles.selection}>
            <div className={styles.createWrapper}>
              <p>Create new Log:</p>
              <Button
                key={123}
                onClick={(e: any) => {
                  console.log("click");
                  handleSubmitLog(e);
                }}
                variant="primary"
                id={styles.button}
                style={{
                  backgroundColor: "#9391ff",
                  borderColor: "#9391ff",
                  borderRadius: "8px",
                }}
              >
                Create Log
              </Button>
            </div>
            <div className={styles.textWrapper}>
              <span>OR </span>
              <div></div>
            </div>
            <div className={styles.createWrapper} id={styles.openPrevious}>
              <p>Open Previous:</p>
              <span>
                {/* Showing the latest log that can be edited as an option. */}
                {logs && logs[0] ? (
                  <>
                    <p onClick={() => setCurrentLog(logs[0])}>
                      {logs ? logs[0].createdAt.toDateString() : ""}
                    </p>
                  </>
                ) : (
                  "No previous logs"
                )}
              </span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
