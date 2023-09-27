import styles from "./Perks.module.scss";

export default function Perks() {
  return (
    <>
      <div className={styles.perkContainer}>
        <h1 className={styles.headingText} id={styles.logsText}>
          Log your symptoms with ease
        </h1>
        <div className={styles.chartContainer}>
          <div className={styles.inputField}>INPUT</div>
          <div className={styles.currentLog}>LOG</div>
        </div>
      </div>
      <div className={styles.perkContainer} id={styles.metrics}>
        <h1 className={styles.headingText}>Look at metrics over time</h1>
        <div className={styles.chartContainer}>
          <div className={styles.pie}>PIE</div>
          <div className={styles.bar}>BAR</div>
        </div>
      </div>
      <div className={styles.perkContainer}>
        <h1 className={styles.headingText}>Perks</h1>
      </div>
    </>
  );
}
