import { useState } from "react";
import { Button } from "react-bootstrap";
import deleteEntryBackend from "../../../../actions/entryRequests/deleteEntry";
import deleteLogBackend from "../../../../actions/logRequests/deleteLog";
import getLog from "../../../../actions/logRequests/getLog";
import { Log, Subcategory } from "../../../../typings";
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
    await deleteLogBackend(id);

    const updatedLog = await getLog(currentLogInProgress.id);
    setCurrentLogInProgress(updatedLog);
  };

  return (
    <>
      {currentLogInProgress ? (
        <>
          <div className="log" key={currentLogInProgress.id}>
            {" "}
            <strong>New Log:</strong>{" "}
            <header className="log-header">
              {currentLogInProgress
                ? currentLogInProgress?.createdAt.toString()
                : ""}{" "}
              <Button
                onClick={() => {
                  setId(currentLogInProgress.id);
                  setDeleteElement("log");
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
                    <div className="description" key={entry.id + 1}>
                      {entry.entry}
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
                      <Button>Edit</Button>
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
