"use client";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import ProfileDetails from "../components/ProfileDetails/ProfileDetails";
import Reminders from "../components/Reminders/Reminders";
import SolidLine from "../components/SolidLine/SolidLine";
import styles from "./page.module.scss";

export default function Settings() {
  // // Add service worker at the top level here.
  // useEffect(() => {
  //   // Checking if the service worker is available in the browser.
  //   if ("serviceWorker" in navigator) {
  //     navigator.serviceWorker
  //       // Registering the service worker in the browser. Go to inspect tools > application > service workers
  //       .register("/service-worker.js")
  //       .then((registration) => console.log("scope is: ", registration.scope));
  //   }
  // }, []);
  return (
    <>
      <NavBar />
      <div className={styles.pageContainer}>
        <div className={styles.headingText} id={styles.reminder}>
          Set Your Reminders
        </div>
        <Reminders />
        <SolidLine />
        <div className={styles.headingText} id={styles.profile}>
          Your Profile
        </div>
        <ProfileDetails />
      </div>
      <Footer />
    </>
  );
}
