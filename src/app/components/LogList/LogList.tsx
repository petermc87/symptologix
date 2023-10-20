import { useContext } from "react";
import { Log } from "../../../../typings";
import {
  NavBarContext,
  NavBarContextTypes,
} from "../ContextNavBar/ContextNavBar";
import styles from "./LogList.module.scss";

export default function LogList() {
  // Create a context to hold all the logs.
  // Add a useEffect to retrieve all the logs and store them in
  // a use Context state.

  // Call the useContext hook and pass in the NavBarContext object.
  const { logs, setCurrentLog } = useContext<NavBarContextTypes | any>(
    NavBarContext
  );

  return (
    <>
      {logs?.map((log: Log) => {
        return (
          <>
            <div
              className={styles.previousLogContainer}
              onClick={() => {
                if (log) setCurrentLog(log);
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
  );
}
