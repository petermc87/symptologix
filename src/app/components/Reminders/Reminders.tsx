// 1. Create a button to send an email notification (this is just for testing).
// 2. The current date converted into UTC
//   2.1. Pass in the userId as the subscriberId and email into the notification.
//   2.2. Pass in the current date and time. See if it can be converted to
//        UTC to make it easier. This will be in the format:
//        (example) '2023-12-05T14:36:00.000Z'.
// 3. Setup an automated notification procedure based on user input.
//   3.1. Research how this can be done.

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Reminders.module.scss";

import { useContext } from "react";
import saveDates from "../../../../actions/dateRequests/saveDates";
import NotificationEmail from "../../../../actions/notificationCalls/emailNofitication";
import { User } from "../../../../typings";
import {
  NavBarContext,
  NavBarContextTypes,
} from "../ContextNavBar/ContextNavBar";

export default function Reminders() {
  // Consume the useSession data here.
  const { data } = useSession();

  let currentUser: User;
  if (data) {
    currentUser = data?.user;
  }

  // Consume the context data for the dates.
  const { fromDate, setFromDate, toDate, setToDate } = useContext<
    NavBarContextTypes | any
  >(NavBarContext);

  // TEST: Check if the jwt is visible here.
  // const { accessToken } = data;
  // console.log(accessToken);

  // Create a function that will perform the notification 3 times.
  // 1. Make sure to have it run when the app has been closed - use window.addEventListner(unload, function(){//code here})
  // 1.1. Use this resource to create a serviceWorker: https://blog.logrocket.com/implementing-service-workers-next-js/
  // 2. Convert the inputted times to a number format that can be
  // used in the algorithm: Follow this: https://www.google.com/search?q=get+a+function+to+go+off+at+selected+times+everyday+javascript&oq=get+a+function+to+go+off+at+selected+times+everyday+ja&gs_lcrp=EgZjaHJvbWUqBwgBECEYoAEyBggAEEUYOTIHCAEQIRigATIHCAIQIRigAdIBCTE1OTEyajBqN6gCALACAA&sourceid=chrome&ie=UTF-8

  // Function for setting the end date.
  const handleSetDate = () => {};

  // Show date picker modal.
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // Handler function for the notification.
  async function handleNotification(e: any) {
    e.preventDefault();

    // Test if current user has no type errors.
    if (currentUser) {
      // TEST: If the notification email was fired. Pass!
      console.log("Notification Email");
      await NotificationEmail(
        currentUser?.id as string,
        currentUser?.email as string
      );
    }
  }

  let intervalId: any;
  const handleDailyIntervals = (e: any, bool: boolean) => {
    e.preventDefault(e);

    // TEST: Parameters passed in. PASS!
    // console.log(bool);

    // Notification that pops up.
    function triggerNotifications() {
      // const window = () => alert("dfgdfgdfg");
      // setTimeout(window, 100);
      // TEST: See if the notification fired in the daily intervals. Pass!
      console.log("Notification Triggered in Daily Notifications.");
      handleNotification(e);
    }

    // TEST: The intervalId
    // Check the boolean here. If its true,
    // clear the interval.
    if (bool === true) {
      clearInterval(intervalId);
      // TEST: Has the intervalId cleared?
      intervalId = 0;
      console.log(intervalId);
    } else {
      // Create the daily interval (only if there isn't one already created.)
      if (intervalId === 0) {
        document.onvisibilitychange = () => {
          intervalId = setInterval(triggerNotifications, 10000);
          // TEST: Event triggered and interval created. PASS!
          console.log("triggered", intervalId);
        };
      } else {
        console.log(
          "You already have an active notification interval. Please delete the current notification interval to create a new one."
        );
      }
    }

    // Set the end of the notifications.
    const endDate = new Date("12/09/2023");

    // console.log(endDate);

    // TEST: Get the current date + 24hrs. Pass!
    // Get today.
    const today = new Date();
    // Add 24hrs in milliseconds.
    const nextDay = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    // console.log(nextDay);

    // Check right now against the end date
    if (new Date() >= endDate) {
      clearInterval(intervalId);
    }
  };

  return (
    <div className={styles.remindersWrapper}>
      <Button onClick={(e) => handleNotification(e)}>Send Notification</Button>
      <Button onClick={(e) => handleDailyIntervals(e, false)}>
        Set intervals
      </Button>
      <Button onClick={(e) => handleDailyIntervals(e, true)}>
        Delete intervals
      </Button>
      {/* Add in the modal that will appear when the date field is selected. */}
      {/* Here is the resource: https://codesandbox.io/s/react-bootstrap-with-datepicker-vccyc?file=/src/index.js */}
      {/* Also need to install react datepicker as a dependency */}
      {/* Create styling that will make the text red if they select today or a previous day.
      i.e. if its today or a day thats gone, then there isnt enough time for notifications
      to be sent. */}
      {/* Create a container that will have the title of the field before the field. */}
      <div className={styles.pickerContainer}>
        <div className={styles.tag}>From</div>
        <DatePicker
          className={styles.pickerField}
          selected={fromDate}
          onChange={(date: Date) => setFromDate(date)}
        />
      </div>
      <div className={styles.pickerContainer}>
        <div className={styles.tag}>To</div>
        <DatePicker
          className={styles.pickerField}
          selected={toDate}
          onChange={(date: Date) => setToDate(date)}
        />
      </div>
      <Button
        onClick={() => {
          saveDates(toDate, fromDate, currentUser.id as string);
        }}
      >
        Save
      </Button>
    </div>
  );
}

// //--> SERVICE WORKER ORIGINAL CODE. <--//
// // Create a separate function to perform the service worker setup
// // and function call to create notification intervals.
// const handleServiceWorker = (e: any, bool: boolean) => {
//   e.preventDefault();
//   // Add service worker at the top level here.
//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker
//       // Registering the service worker in the browser. Go to inspect tools > application > service workers
//       .register("/service-worker.js", { scope: "/settings" })
//       .then((registration) => {
//         console.log("scope is: ", registration.scope);
//         // TEST: Check if the bool is getting passed in. Pass!
//         // console.log(bool);
//         handleDailyIntervals(e, bool);
//       });
//   }
// };

// // ISSUE: Causing the database to drop out.
// registration.pushManager.subscribe({
//   userVisibleOnly: true,
//   // applicationServerKey,
// });
// self.addEventListener("push", (event) => {
//   event.preventDefault();
//   handleDailyIntervals(e, bool);
// });

// window.addEventListener("unload", async () => {
//   // TEST: Check if this works.
//   console.log("beforeunload");

//   try {
//     await handleDailyIntervals(e, bool);
//   } catch (error) {
//     console.error(error);
//   }
// });
