import styles from "./Perks.module.scss";

export default function Perks() {
  return (
    <>
      <div className={styles.perkContainer}>
        <h1 className={styles.headingText} id={styles.logsText}>
          Log your symptoms with ease
        </h1>
        <div className={styles.chartContainer}>
          <div id={styles.inputField} className={styles.chartType}>
            INPUT
          </div>
          <div id={styles.currentLog} className={styles.chartType}>
            LOG
          </div>
        </div>
      </div>
      <div className={styles.perkContainer} id={styles.metrics}>
        <h1 className={styles.headingText}>Look at metrics over time</h1>
        <div className={styles.chartContainer}>
          <div id={styles.pie} className={styles.chartType}>
            PIE
          </div>
          <div id={styles.bar} className={styles.chartType}>
            BAR
          </div>
        </div>
      </div>
      <div className={styles.perkContainer}>
        <h1 className={styles.headingText}>Perks</h1>
      </div>
    </>
  );
}
