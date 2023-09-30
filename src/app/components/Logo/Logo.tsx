import styles from "./Logo.module.scss";

export default function Logo() {
  return (
    <div className={styles.logo}>
      <span>S</span>ymptologi<span id={styles.x}>X</span>
    </div>
  );
}
