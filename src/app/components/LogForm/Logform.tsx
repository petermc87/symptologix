import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import deleteEntryBackend from "../../../../actions/entryRequests/deleteEntry";
import updateEntryBackend from "../../../../actions/entryRequests/updateEntry";
import {
  deleteLogBackend,
  deleteLogWithEntries,
} from "../../../../actions/logRequests/deleteLog";
import getLog from "../../../../actions/logRequests/getLog";
import { Entry, Log, Subcategory } from "../../../../typings";
import DangerModal from "../modal/dangerModal";

type LogFormTypes = {
  currentLogInProgress: Log | null | any;
  setCurrentLogInProgress: any;
  subCategories: Subcategory[];
};

export default function LogForm({
  currentLogInProgress,
  setCurrentLogInProgress,
  subCategories,
}: LogFormTypes) {
  //Show state for modal
  const [show, setShow] = useState(false);

  // Element to be deleted (either log or entry)
  const [deleteElement, setDeleteElement] = useState("");

  // ID for delete
  const [id, setId] = useState("");

  // Handlers for the modal state
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  // We handle the entry state by showing it in an input container and updating the state
  const [currentEntry, setCurrentEntry] = useState<Entry | undefined | any>();

  // We have an input form that will be shown on click.
  const [showEditEntry, setShowEditEntry] = useState(false);

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
    const updatedLog = await getLog(currentLogInProgress.id);
    setCurrentLogInProgress(updatedLog);
  };

  // Delete method for log.
  const deleteLog = async (id: string) => {
    // Performing delete action on whether there are entries or not.
    if (currentLogInProgress.entries) {
      await deleteLogWithEntries(id);
    } else {
      await deleteLogBackend(id);
    }

    const updatedLog = await getLog(currentLogInProgress.id);
    setCurrentLogInProgress(updatedLog);
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
    const updatedLog = await getLog(currentLogInProgress.id);
    setCurrentLogInProgress(updatedLog);
  };

  // Add update entry by using the same methods from yum2me
  return (
    <>
      {currentLogInProgress ? (
        <>
          <div className="log" key={currentLogInProgress.id}>
            {" "}
            <strong>New Log:</strong>{" "}
            <header className="log-header">
              {/* Making the createdAt date a string outputted to the screen. */}
              {currentLogInProgress
                ? currentLogInProgress?.createdAt.toString()
                : ""}{" "}
              <Button
                onClick={() => {
                  setId(currentLogInProgress.id);
                  // Set a conditional to show whether its an empty log or a log
                  // with entries being deleted.
                  if (currentLogInProgress.entries) {
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
            <div className="entries" key={currentLogInProgress.id}>
              <div className="headings" key={currentLogInProgress.id + 1}>
                <h4>SubCat</h4>
                <h4>Description</h4>
                <h4></h4>
              </div>

              {/* Add in the map here for the rest of the entry components. */}
              {currentLogInProgress.entries?.map((entry: any) => {
                // Run a mapping function here that will match the subcat id with
                // the id of the subcat in the entry object.

                // Pass entry.subCategoryId to the function and store the name here.
                const name = getSubcat(entry.subCategoryId);
                return (
                  <div className="entry">
                    {" "}
                    <div className="subcat" key={entry.id}>
                      {name}
                    </div>
                    {/* This is where the edit entry will be shown and will replace the current text. */}
                    <div className="description" key={entry.id + 1}>
                      {showEditEntry ? (
                        // This will be shown when the edit button is
                        <Form
                          onSubmit={(e) => {
                            setShowEditEntry(false);
                            updateEntry(e, entry.id);
                          }}
                          key={currentLogInProgress.id + 5}
                        >
                          {/* Edit in place field for the current entry. */}
                          <Form.Group>
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
                          </Form.Group>
                        </Form>
                      ) : (
                        <>{entry.entry}</>
                      )}
                    </div>
                    <div className="buttons" key={entry.id + 2}>
                      {/* Add a prompt window that will ask 'if your're sure'. Use  */}
                      {/* a statement to check if ok, the instigate the delete method.  */}
                      <Button
                        onClick={() => {
                          // Use modal window from react bootstrap. Call a seperate component with
                          // text passed in.
                          // Set the id state and open the modal. The delete button in the modal will
                          // call the delete function, which will take in the current id state
                          setId(entry.id);
                          setDeleteElement("entry");
                          setShow(true);
                        }}
                      >
                        Del
                      </Button>
                      {/* Set the current entry here. */}
                      <Button
                        onClick={() => {
                          setCurrentEntry(entry);
                          setShowEditEntry(true);
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                );
              })}
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
        </>
      ) : (
        ""
      )}
    </>
  );
}
