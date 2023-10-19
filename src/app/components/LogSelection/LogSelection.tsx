import { useContext } from "react";
import { Button } from "react-bootstrap";
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
  const { currentLog, setCurrentLog } = useContext<NavBarContextTypes | any>(
    NavBarContext
  );

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
  console.log(currentLog);

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
              >
                Create Log
              </Button>
            </div>

            <div className={styles.textWrapper}>
              <span>OR </span>
              <div></div>
            </div>
            <div className={styles.createWrapper} id={styles.openPrevious}>
              <p>Open Previous</p>
              <span>
                <p>12/10/2023</p>
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
