"use client";
import NavBarProvider from "../components/ContextNavBar/ContextNavBar";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import styles from "./page.module.scss";

export default function PreviousLogsPage() {
  return (
    <>
      <NavBarProvider>
        <NavBar />
        <div className={styles.previousPageContainer}>
          <div className={styles.headingText}>Select from Previous Logs</div>
          <div className={styles.previousLogWrapper}>
            <div className={styles.previousLogContainer}>
              <h2>Placeholder Container</h2>
            </div>
            <button>View</button>
          </div>
        </div>
        <Footer />
      </NavBarProvider>
    </>
  );
}
