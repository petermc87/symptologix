import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import CreateSubscriber from "../../../../actions/subscriberCalls/createSubscriber";
import UpdateSubscriber from "../../../../actions/subscriberCalls/updatesubscriber";
import UpdateUser from "../../../../actions/userRequests/updateUser";
import { User } from "../../../../typings";
import styles from "./ProfileDetails.module.scss";

export default function ProfileDetails() {
  // Get user data to be added to the subscriber.
  const { data, update } = useSession();

  // Saving just the user data to a variable.
  const user: User | undefined = data?.user;

  // List of components to be rendered.
  const detailsComponents = ["name", "username", "email"];

  // Field for updating selected data.
  const [updateField, setUpdateField] = useState<boolean>(false);

  // Data title being updated.
  const [title, setTitle] = useState<string>("");

  // State for holding the updated user.
  const [updatedUser, setUpdatedUser] = useState<User | null | undefined>(null);

  // UseEffect will instigate the subscriber backend function
  // for testing.
  useEffect(() => {
    // A subscriber will be created if it isnt already created.
    if (user) {
      CreateSubscriber(
        user?.email as string,
        user?.name as string,
        user?.id as string
      );
    }
  }, [user]);

  // Test update subscriber.
  // NOTE: This is a holistic function for every update i.e. if only
  // on parameter is updated, it will updated everything from the session
  // data including the new data from the field.
  const handleUpdateSubscriber = async () => {
    await UpdateSubscriber(
      user?.name as string,
      user?.email as string,
      user?.id as string
    );
  };

  // Update user.
  const handleUpdateUser = async (e: any) => {
    e.preventDefault();
    // Pass in the current field being edited. This will determine what update
    // need to happen in the backend.
    // Use a condition to ensure it is updating only the field that was edited.
    if (title === "name") {
      await UpdateUser(updatedUser?.name as string, title, user?.id as string);

      // Get the user and update the session data here using update() function
      // baked into next-auth.
      update({ name: updatedUser?.name });
    } else if (title === "username") {
      await UpdateUser(
        updatedUser?.username as string,
        title,
        user?.id as string
      );

      // Get the user and update the session data here using update() function
      // baked into next-auth.
      update({ username: updatedUser?.username });
    } else {
      await UpdateUser(updatedUser?.email as string, title, user?.id as string);

      // Get the user and update the session data here using update() function
      // baked into next-auth.
      update({ email: updatedUser?.email });
    }
    handleUpdateSubscriber();
    setUpdatedUser(null);
  };

  // //Check the user data coming in.
  // console.log("user data", user);
  // // Check the updatedUser as it is being updated.
  // console.log("udpated user data", updatedUser);
  // // The current selected title.
  // console.log(title);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.photoWrapper}>
        <h3 className={styles.heading}>Photo</h3>
        {/* Add photo upload feature here. */}
      </div>
      <div className={styles.detailsWrapper}>
        <h3 className={styles.heading}>Details</h3>

        {/* Create a mapping function for each of the three containers. */}
        {/* These are all identical components in terms of their stlying. */}
        {detailsComponents.map((componentName, i: number) => {
          // console.log(user?.id + componentName);
          return (
            <>
              <div className={styles.individualContainer}>
                <div className={styles.title}>{componentName}</div>

                {/* Create edit entry for this one first. Make sure it updates */}
                {/* in the database as well as in Novu. */}
                {/* NOTE: Make sure we are only editing the selected field */}

                {updateField && title === componentName ? (
                  <>
                    <Form
                      onSubmit={(e) => {
                        setUpdateField(false);
                        handleUpdateUser(e);
                      }}
                      key={(user?.id + componentName) as string}
                    >
                      <Form.Group>
                        {/* To ensure the key:value match, use a ternary. */}
                        {i === 0 ? (
                          <Form.Control
                            // Taking the updatedUser (just the name) and
                            // passing it in as the current value.
                            key={user?.id + "1"}
                            value={updatedUser?.name}
                            placeholder="input"
                            onChange={(e) => {
                              console.log("name selected", updatedUser?.name);
                              setUpdatedUser({
                                ...updatedUser,
                                name: e.target.value,
                              });
                            }}
                          />
                        ) : i === 1 ? (
                          <Form.Control
                            // Taking the updatedUser (just the name) and
                            // passing it in as the current value.
                            key={user?.id + "2"}
                            value={updatedUser?.username as string}
                            placeholder="input"
                            onChange={(e) => {
                              console.log(
                                "username selected",
                                updatedUser?.username
                              );
                              setUpdatedUser({
                                ...updatedUser,
                                username: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <Form.Control
                            // Taking the updatedUser (just the name) and
                            // passing it in as the current value.
                            key={user?.id + "3"}
                            value={updatedUser?.email}
                            placeholder="input"
                            onChange={(e) => {
                              setUpdatedUser({
                                ...updatedUser,
                                email: e.target.value,
                              });
                            }}
                          />
                        )}

                        <div
                          onClick={() => {
                            setUpdateField(false);
                            setUpdatedUser(null);
                          }}
                        >
                          X
                        </div>
                      </Form.Group>
                    </Form>
                  </>
                ) : (
                  <>
                    <div className={styles.data}>
                      {/* Rendering the correct data based on the iteration of the */}
                      {/* detailsComponents array. */}
                      {i === 0 ? (
                        <>{user?.name}</>
                      ) : i === 1 ? (
                        <>{user?.username}</>
                      ) : (
                        <>{user?.email}</>
                      )}
                    </div>
                  </>
                )}
                <Button
                  style={{
                    backgroundColor: "#1071e5",
                    borderColor: "#1071e5",
                    borderRadius: "8px",
                    padding: "2px",
                    margin: "2px",
                  }}
                  //we need to set the updated user to here to the current
                  // user object so it can be edited.
                  onClick={() => {
                    // Will open the edit field if it isnt open already.
                    if (!updateField) {
                      // Set the current selected componentName
                      setTitle(componentName);
                      setUpdatedUser(user);
                      setUpdateField(true);
                      // Set id for the selected entry.
                    } else {
                      setTitle("");
                      setUpdatedUser(null);
                      setUpdateField(false);
                    }
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
            </>
          );
        })}
      </div>
    </div>
  );

  // Create update for profile and subscriber.
  // First, do an update to the user in the database,
  // then check the session data.
}
