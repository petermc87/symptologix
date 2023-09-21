import { FormEvent } from "react";
import { Button, Form } from "react-bootstrap";
import submitEntry from "../../../../actions/entryRequests/submitEntry";
import { Log } from "../../../../typings";

// Types for the user object.
type EntryFormTypes = {
  selectedSubCat: any;
  currentLogInProgress: Log | null;
  setCurrentLoginProgress: any;
};

export default function EntryForm({
  currentLogInProgress,
  setCurrentLoginProgress,
  selectedSubCat,
}: EntryFormTypes) {
  // console.log(currentLogInProgress, selectedSubCat);
  // We take in the current subcat and and the current log in progress setter.
  // We perform a submission to Entry, then an get request for the current log in
  // progress so it can be reset to the latest info.

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Creating a new FormData instance from react and createing the event as
    // a html type
    const formData = new FormData(e.target as HTMLFormElement);
    const inputQuery = formData.get("inputquery")?.toString();

    // We then create a new entry which will need to SetLog, the Entry String and the SubCat to be passed in.
    if (inputQuery) {
      try {
        const log = await submitEntry({
          selectedSubCat,
          inputQuery,
          currentLogInProgress,
        });
        // Add the setter function here. The returned value will be the Log object which can be set here.
        setCurrentLoginProgress(log);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <>
      {currentLogInProgress ? (
        <>
          New Log Entry:
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {selectedSubCat.name}:
              <Form.Control
                name="inputquery"
                placeholder="Enter your log entry..."
              />
              <Button type="submit" className="mb-3">
                +
              </Button>
            </div>
          </Form>
        </>
      ) : (
        "Please create a log first (at the top of the page) before creating an entry."
      )}
    </>
  );
}
