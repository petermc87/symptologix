import styles from "./flowArrow.module.scss";
export default function FlowArrow() {
  return (
    <>
      <div
        key={Math.floor(Math.random() * 10000) + 1}
        className={styles.arrowWrapper}
      >
        <div className={styles.stem}></div>
        <div className={styles.triangleBottom}></div>
      </div>
    </>
  );
}
