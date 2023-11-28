"use client";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
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
        <SolidLine />
        <div className={styles.headingText} id={styles.profile}>
          Your Profile
        </div>
      </div>
      <Footer />
    </>
  );
}
