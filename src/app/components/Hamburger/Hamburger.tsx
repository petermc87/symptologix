import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import {
  NavBarContext,
  NavBarContextTypes,
} from "../ContextNavBar/ContextNavBar";
import Logo from "../Logo/Logo";
import styles from "./Hamburger.module.scss";

export default function Hamburger() {
  // consume the session data here to differentiate between the list of
  // hamburger options.
  const { data } = useSession();

  const route = useRouter();

  // Consume the context related to the show and setShow state variables.
  const { setShow, setState } = useContext<NavBarContextTypes | false | any>(
    NavBarContext
  );

  return (
    <div className={styles.hamburgerMenu}>
      {/* This if for toggling on and off the ham menu. */}
      <input id={styles.menuToggle} type="checkbox" />
      <label className={styles.menuBtn} htmlFor={styles.menuToggle}>
        <span></span>
      </label>
      {/* List of menu items. */}
      {/* This list of items is active when the client is visiting the landing page. */}
      <ul className={styles.menuBox}>
        {/* If the data doesnt exist, list these two. */}
        {!data ? (
          <>
            <li
              onClick={() => {
                setState("login");
                setShow(true);
              }}
            >
              <a className={styles.menuItem}>Log In</a>
            </li>
            <li
              onClick={() => {
                setState("signup");
                setShow(true);
              }}
            >
              <a className={styles.menuItem}>Sign Up</a>
            </li>
          </>
        ) : (
          <>
            <li onClick={() => route.push("/home")}>
              <a className={styles.menuItem}>New Log</a>
            </li>
            <li onClick={() => route.push("/previous")}>
              <a className={styles.menuItem}>Previous Logs</a>
            </li>
            <li onClick={() => route.push("/insights")}>
              <a className={styles.menuItem}>Insights</a>
            </li>
            <li
              onClick={() => {
                signOut();
                // Myabe add a time delay to route home after signing out to
                // give the signOut function enough time to complete before performing the reroute.
                route.push("/");
              }}
            >
              <a className={styles.menuItem}>Log Out</a>
            </li>
            <li onClick={() => route.push("/")}>
              <Logo />
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
