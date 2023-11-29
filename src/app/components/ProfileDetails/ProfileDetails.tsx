import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import CreateSubscriber from "../../../../actions/subscriberCalls/createSubscriber";
import UpdateSubscriber from "../../../../actions/subscriberCalls/updatesubscriber";
import { User } from "../../../../typings";
import styles from "./ProfileDetails.module.scss";

export default function ProfileDetails() {
  // Get user data to be added to the subscriber.
  const { data } = useSession();

  // Saving just the user data to a variable.
  const user: User | undefined = data?.user;

  // console.log(user);
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
  const handleUpdateSubscriber = (newName: string) => {
    UpdateSubscriber(newName, user?.email as string, user?.id as string);
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
          <div className={styles.data}>{user?.name}</div>
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
