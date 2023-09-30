import styles from "./Hamburger.module.scss";

export default function Hamburger() {
  return (
    <div className={styles.hamburgerMenu}>
      {/* This if for toggling on and off the ham menu. */}
      <input id={styles.menuToggle} type="checkbox" />
      <label className={styles.menuBtn} htmlFor={styles.menuToggle}>
        <span></span>
      </label>
      {/* List of menu items. */}
      <ul className={styles.menuBox}>
        <li>
          <a className={styles.menuItem}>Log In</a>
        </li>
        <li>
          <a className={styles.menuItem}>Sign Up</a>
        </li>
      </ul>
    </div>
  );
}
