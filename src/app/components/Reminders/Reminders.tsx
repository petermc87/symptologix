// 1. Create a button to send an email notification (this is just for testing).
// 2. The current date converted into UTC
//   2.1. Pass in the userId as the subscriberId and email into the notification.
//   2.2. Pass in the current date and time. See if it can be converted to
//        UTC to make it easier. This will be in the format:
//        (example) '2023-12-05T14:36:00.000Z'.
// 3. Setup an automated notification procedure based on user input.
//   3.1. Research how this can be done.

import { useSession } from "next-auth/react";
import { Button } from "react-bootstrap";
import NotificationEmail from "../../../../actions/notificationCalls/emailNofitication";
import { User } from "../../../../typings";

export default function Reminders() {
  // Consume the useSession data here.
  const { data } = useSession();

  let currentUser: User;

  if (data) {
    currentUser = data?.user;
  }

  // Handler function for the notification.
  const handleNotification = async (e: any) => {
    e.preventDefault();
    // Test if current user has no type errors.
    if (currentUser) {
      await NotificationEmail(currentUser?.id, currentUser?.email);
    }
  };

  return (
    <>
      <Button onClick={(e) => handleNotification(e)}>Send Notification</Button>
    </>
  );
}
