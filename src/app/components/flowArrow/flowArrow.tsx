import styles from "./flowArrow.module.scss";
export default function FlowArrow() {
  return (
    <>
      <div className={styles.arrowWrapper}>
        <div className={styles.stem}></div>
        <div className={styles.triangleBottom}></div>
      </div>
    </>
  );
}
