import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import deleteEntryBackend from "../../../../actions/entryRequests/deleteEntry";
import updateEntryBackend from "../../../../actions/entryRequests/updateEntry";
import {
  deleteLogBackend,
  deleteLogWithEntries,
} from "../../../../actions/logRequests/deleteLog";
import getLog from "../../../../actions/logRequests/getLog";
import { Entry, Subcategory } from "../../../../typings";
import {
  NavBarContext,
  NavBarContextTypes,
} from "../ContextNavBar/ContextNavBar";
import DangerModal from "../modal/dangerModal";
import styles from "./LogForm.module.scss";

type LogFormTypes = {
  subCategories: Subcategory[];
};

export default function LogForm({ subCategories }: LogFormTypes) {
  // Use and consume context for current log.
  const { currentLog, setCurrentLog } = useContext<NavBarContextTypes | any>(
    NavBarContext
  );

  //Show state for modal
  const [show, setShow] = useState(false);

  // Element to be deleted (either log or entry)
  const [deleteElement, setDeleteElement] = useState("");

  // ID for delete
  const [id, setId] = useState("");

  // We handle the entry state by showing it in an input container and updating the state
  const [currentEntry, setCurrentEntry] = useState<Entry | undefined | any>();

  // We have an input form that will be shown on click.
  const [showEditEntry, setShowEditEntry] = useState(false);

  // Handlers for the modal state
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  // When the entry is submitted, we search the subCategories state array that are stored in cache so
  // the object can be searched here, matched with the id and the name displayed.
  // This avoids another database query.
  const getSubcat = (id: string) => {
    // Create a variable to store the name
    let name;
    // Cycle throuh each one
    subCategories.map((subcat) => {
      // Test the loop.
      // console.log(subcat.name)

      // Create a statement that will check the id vs the
      // id in each object. If there is a match, return the name
      if (subcat.id === id) {
        name = subcat.name;
      }
    });
    return name;
  };

  // Add a delete method for an entry.
  const deleteEntry = async (id: string) => {
    // Call the backend request.
    await deleteEntryBackend(id);

    // Retrieving the log from the updated log from the databse.
    const updatedLog = await getLog(currentLog.id);
    setCurrentLog(updatedLog);
  };

  // Delete method for log.
  const deleteLog = async (id: string) => {
    // Performing delete action on whether there are entries or not.
    if (currentLog.entries) {
      await deleteLogWithEntries(id);
    } else {
      await deleteLogBackend(id);
    }

    const updatedLog = await getLog(currentLog.id);
    setCurrentLog(updatedLog);
  };

  // Create an updater function that will take in the new data for entry and
  // post it to the database. This will also get the log again.
  const updateEntry = async (e: any, id: string) => {
    e.preventDefault();
    // // Test the function is working.
    // console.log(id);
    // Update with the new state.
    await updateEntryBackend(id, currentEntry.entry);
    // Retrieving the log from the updated log from the databse.
    const updatedLog = await getLog(currentLog.id);
    setCurrentLog(updatedLog);
  };

  // If there is a current log in progress, breakdown the date/time string and
  // only output the data, month, year, time, etc.
  const getDateTime = () => {
    if (currentLog) {
      const splitDateTime = currentLog.createdAt.toString().split(" ");
      const logDateTime =
        splitDateTime[0] +
        " " +
        splitDateTime[1] +
        " " +
        splitDateTime[2] +
        " " +
        splitDateTime[3] +
        ", " +
        splitDateTime[4];
      return logDateTime;
    }
  };

  return (
    <>
      {currentLog ? (
        <div className={styles.logWrapper}>
          <div className={styles.logForm} key={currentLog.id}>
            {" "}
            <h2 className={styles.logHeading}>Current Log</h2>{" "}
            <header className={styles.logHeader}>
              {/* Making the createdAt date a string outputted to the screen. */}
              {currentLog
                ? // Taking the createAd string and splitting it into different sections.
                  getDateTime()
                : ""}{" "}
              {/* DELETE LOG BUTTON */}
              <Button
                style={{
                  backgroundColor: "#ff9595",
                  borderColor: "#ff9595",
                  borderRadius: "8px",
                }}
                onClick={() => {
                  setId(currentLog.id);
                  // Set a conditional to show whether its an empty log or a log
                  // with entries being deleted.
                  if (currentLog.entries) {
                    setDeleteElement("log and its associated entries");
                  } else {
                    setDeleteElement("log");
                  }
                  setShow(true);
                }}
              >
                Delete Log
              </Button>
            </header>
            <div className={styles.entries} key={currentLog.id}>
              {/* SUB HEADINGS */}
              <div className={styles.headings} key={currentLog.id + 1}>
                <div className={styles.subcatHeading}>Sub-Category</div>
                <div className={styles.descriptionHeading}>Description</div>
              </div>

              {/* Add in the map here for the rest of the entry components. */}
              {currentLog.entries?.map((entry: Entry) => {
                // Run a mapping function here that will match the subcat id with
                // the id of the subcat in the entry object.

                // Pass entry.subCategoryId to the function and store the name here.
                const name = getSubcat(entry.subCategoryId);

                return (
                  <div className={styles.entry}>
                    {" "}
                    {/* ENTRY SUBCAT AND DESCRIPTION. */}
                    <div className={styles.entriesWrapper}>
                      <div className={styles.loggedSubcat} key={entry.id}>
                        {name}
                      </div>
                      {/* This is where the edit entry will be shown and will replace the current text. */}
                      {/* NOTE: So that only the entry field for that specific entry opens, we have to check  */}
                      {/* the current entry matches one of the entries in the list. */}
                      {showEditEntry && entry.id === currentEntry.id ? (
                        // This will be shown when the edit button is
                        <Form
                          onSubmit={(e) => {
                            setShowEditEntry(false);
                            updateEntry(e, entry.id);
                          }}
                          key={currentLog.id + 5}
                        >
                          {/* Edit in place field for the current entry. */}
                          <Form.Group className={styles.editEntry}>
                            <Form.Control
                              value={currentEntry.entry}
                              placeholder="entry"
                              onChange={(e) => {
                                setCurrentEntry({
                                  ...currentEntry,
                                  entry: e.target.value,
                                });
                              }}
                            />
                            <div onClick={() => setShowEditEntry(false)}>X</div>
                          </Form.Group>
                        </Form>
                      ) : (
                        <div className={styles.description}>{entry.entry}</div>
                      )}
                    </div>
                    {/* BUTTONS. */}
                    <div className={styles.buttons} key={entry.id + 2}>
                      {/* Add a prompt window that will ask 'if your're sure'. Use  */}
                      {/* a statement to check if ok, the instigate the delete method.  */}
                      <Button
                        style={{
                          backgroundColor: "#ff9595",
                          borderColor: "#ff9595",
                          borderRadius: "8px",
                          padding: "2px",
                          margin: "2px",
                        }}
                        onClick={() => {
                          // Use modal window from react bootstrap. Call a seperate component with
                          // text passed in.
                          // Set the id state and open the modal. The delete button in the modal will
                          // call the delete function, which will take in the current id state
                          setId(entry.id);
                          setDeleteElement("entry");
                          setShow(true);
                        }}
                        //--- DELETE BUTTON ICON ---//
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash3"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                        </svg>
                      </Button>
                      {/* Set the current entry here. */}
                      <Button
                        style={{
                          backgroundColor: "#1071e5",
                          borderColor: "#1071e5",
                          borderRadius: "8px",
                          padding: "2px",
                          margin: "2px",
                        }}
                        onClick={() => {
                          setCurrentEntry(entry);
                          setShowEditEntry(true);
                          // Set id for the selected entry.
                        }}
                        //--- EDIT BUTTON ICON ---//
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Create a button that will set the current log in progess to null. */}
            <div className={styles.finishButton}>
              {/* TASK: Add a feature that will set a text state to show 'success!' when a log  */}
              {/* is submitted. */}
              {currentLog.entries ? (
                <Button
                  style={{
                    backgroundColor: "#9391ff",
                    borderColor: "#9391ff",
                    borderRadius: "8px",
                  }}
                  onClick={() => {
                    setCurrentLog(null);
                  }}
                >
                  Finish
                </Button>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* Need to ceate another state variable store the id to be passed into the delete function.
          This needs to be stored on click of the delete button on the log form.
          */}
          <DangerModal
            show={show}
            handleClose={handleClose}
            handleOpen={handleOpen}
            elementName={deleteElement}
            deleteEntry={deleteEntry}
            deleteLog={deleteLog}
            id={id}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
