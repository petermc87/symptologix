// Imports
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Entry, Log } from "../../../../typings";

import styles from "./LogView.module.scss";

type LogViewTypes = {
  selectedLog: Log;
  setSelectedLog: Dispatch<SetStateAction<Log | null | undefined>>;
};

export default function LogView({ selectedLog, setSelectedLog }: LogViewTypes) {
  // Add in the code for the ref handler for clicking outside to close.
  // Create reference to the element that will close
  // when clicked outside of it.
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
  return (
    <div className={styles.logView} ref={ref} key={selectedLog.id}>
      <div className={styles.logContainer}>
        <h1>Log View</h1>
        {selectedLog.createdAt?.toLocaleTimeString()}
        <>
          <h2>Previous Entries</h2>
          {selectedLog.entries?.map((entry: Entry) => {
            return (
              <ul>
                <li>{entry.entry}</li>
              </ul>
            );
          })}
        </>
      </div>
    </div>
  );
}
