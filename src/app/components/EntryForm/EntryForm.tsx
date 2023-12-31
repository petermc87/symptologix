import { useSession } from "next-auth/react";
import { FormEvent, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import submitEntry from "../../../../actions/entryRequests/submitEntry";
import {
  NavBarContext,
  NavBarContextTypes,
} from "../ContextNavBar/ContextNavBar";
import DottedLine from "../DottedLine/DottedLine";
import styles from "./EntryForm.module.scss";
// Types for the user object.
type EntryFormTypes = {
  selectedSubCat: any;
};

export default function EntryForm({ selectedSubCat }: EntryFormTypes) {
  // Consume the context for currentLog
  const { currentLog, setCurrentLog } = useContext<NavBarContextTypes | any>(
    NavBarContext
  );

  // Take in the user session so that the id can be passed in to the backend
  // for addition to the log entry.
  const { data } = useSession<boolean>();

  // console.log();

  let userId: string;

  // Type checking the user.id is a string before assigning it.
  if (data && typeof data.user.id === "string") {
    userId = data.user.id;
  }

  // We take in the current subcat and and the current log in progress setter.
  // We perform a submission to Entry, then an get request for the current log in
  // progress so it can be reset to the latest info.
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Creating a new FormData instance from react and createing the event as
    // a html type
    const formData = new FormData(e.target as HTMLFormElement);
    let inputQuery = formData.get("inputquery")?.toString();

    // We then create a new entry which will need to SetLog, the Entry String and the SubCat to be passed in.
    if (inputQuery) {
      try {
        const log = await submitEntry({
          selectedSubCat,
          inputQuery,
          currentLog,
          userId,
        });
        // Add the setter function here. The returned value will be the Log object which can be set here.
        // NOTE: This is now changed to a a useContext state varaibles.
        setCurrentLog(log);
        formData.set("inputquery", "");
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <>
      {currentLog ? (
        <div className={styles.entryFormWrapper}>
          {/* Create a separate componnet for these headings. */}
          <div className={styles.background}>
            <h2 className={styles.entryHeading}>New Log Entry</h2>
            <Form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              className={styles.form}
            >
              <Form.Label style={{ margin: "0" }} className={styles.label}>
                {selectedSubCat.name}
              </Form.Label>
              <Form.Group className={styles.inputControls}>
                <Form.Control name="inputquery" className={styles.input} />
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#00c2a8",
                    borderColor: "#00c2a8",
                    borderRadius: "8px",
                  }}
                >
                  +
                </Button>
              </Form.Group>
            </Form>
          </div>
          <DottedLine />
        </div>
      ) : (
        <div className={styles.errorMessage}>
          Please create a log or select the last created log first (at the top
          of the page) before creating an entry.
        </div>
      )}
    </>
  );
}
