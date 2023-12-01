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

  // Check if the session data updates after an item within the
  // data is updated below.
  // console.log(updatedUser);

  // Test update subscriber.
  const handleUpdateSubscriber = (newName: string) => {
    UpdateSubscriber(newName, user?.email as string, user?.id as string);
  };

  // Update user.
  const handleUpdateUser = async (e: any) => {
    e.preventDefault();

    // Pass in the current field being edited. This will determine what update
    // need to happen in the backend.
    await UpdateUser(updatedUser?.name as string, title, user?.id as string);

    // Get the user and update the session data here using update() function
    // baked into next-auth.
    update({ name: updatedUser?.name });
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.photoWrapper}>
        <h3 className={styles.heading}>Photo</h3>
        {/* Add photo upload feature here. */}
      </div>
      <div className={styles.detailsWrapper}>
        <h3 className={styles.heading}>Details</h3>
        <div className={styles.individualContainer}>
          <div className={styles.title}>Name</div>
          {/* Create edit entry for this one first. Make sure it updates */}
          {/* in the database as well as in Novu. */}

          {updateField && title === "name" ? (
            <Form
              onSubmit={(e) => {
                setUpdateField(false);
                handleUpdateUser(e);
              }}
              key={12345678}
            >
              <Form.Group>
                <Form.Control
                  // Taking the updatedUser (just the name) and
                  // passing it in as the current value.
                  value={updatedUser?.name}
                  placeholder="name"
                  onChange={(e) => {
                    setUpdatedUser({
                      ...updatedUser,
                      name: e.target.value,
                    });
                  }}
                />
                <div
                  onClick={() => {
                    setUpdateField(false);
                  }}
                >
                  X
                </div>
              </Form.Group>
            </Form>
          ) : (
            <div className={styles.data}>{user?.name}</div>
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
              setTitle("name");
              setUpdatedUser(user);
              setUpdateField(true);
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
        <div className={styles.individualContainer}>
          <div className={styles.title}>UserName</div>
          <div className={styles.data}>{user?.username as string}</div>
        </div>
        <div className={styles.individualContainer}>
          <div className={styles.title}>Email</div>
          <div className={styles.data}>{user?.email}</div>
        </div>
      </div>
      <Button
        onClick={() => {
          handleUpdateSubscriber("test one");
        }}
      >
        Update sub
      </Button>
    </div>
  );

  // Create update for profile and subscriber.
  // First, do an update to the user in the database,
  // then check the session data.
}

// --> UseEffect with added get request. <-- //
// useEffect(() => {
//   // Have a get subscriber, but it it returns nothing,
//   // create one.
//   if (user) {
//     const fetchSubscriber = async () => {
//       const subscriber = await GetSubscriber(user?.id as string);

//       console.log(subscriber);
//       // if(subscriber )
//       CreateSubscriber(
//         user?.email as string,
//         user?.name as string,
//         user?.id as string
//       );
//     };
//     fetchSubscriber();
//   }
// }, [user]);
