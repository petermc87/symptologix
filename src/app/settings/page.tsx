"use client";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import ProfileDetails from "../components/ProfileDetails/ProfileDetails";
import Reminders from "../components/Reminders/Reminders";
import SolidLine from "../components/SolidLine/SolidLine";
import styles from "./page.module.scss";

export default function Settings() {
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
