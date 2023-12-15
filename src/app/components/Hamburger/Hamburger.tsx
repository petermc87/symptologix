import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
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

  // Create a toggle state.
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <div className={styles.hamburgerMenu}>
      {/* This if for toggling on and off the ham menu. */}
      <input
        id={styles.menuToggle}
        type="checkbox"
        // Creating a toggle boolean so the hamburger menu can be
        // closed after either login or signup is selected.
        checked={toggle}
        onClick={() => {
          if (toggle) {
            setToggle(false);
          } else {
            setToggle(true);
          }
        }}
      />
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
                setToggle(false);
              }}
            >
              <a className={styles.menuItem}>Log In</a>
            </li>
            <li
              onClick={() => {
                setState("signup");
                setShow(true);
                setToggle(false);
              }}
            >
              <a className={styles.menuItem} id={styles.signUp}>
                Sign Up
              </a>
            </li>
          </>
        ) : (
          <>
            <li
              onClick={() => {
                route.push("/home");
                setToggle(false);
              }}
            >
              <a className={styles.menuItem}>New Log</a>
            </li>
            <li
              onClick={() => {
                route.push("/previous");
                setToggle(false);
              }}
            >
              <a className={styles.menuItem}>Previous Logs</a>
            </li>
            <li
              onClick={() => {
                route.push("/insights");
                setToggle(false);
              }}
            >
              <a className={styles.menuItem}>Insights</a>
            </li>
            <li
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
            >
              <a className={styles.menuItem} id={styles.logOut}>
                Log Out
              </a>
            </li>
            <li
              onClick={() => {
                route.push("/settings");
                setToggle(false);
              }}
              id={styles.settings}
            >
              <a className={styles.menuItem}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-gear-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                </svg>
              </a>
            </li>
          </>
        )}
        <li className={styles.logoWrapper} onClick={() => route.push("/")}>
          <Logo />
          <p>All rights reserved 2023</p>
        </li>
      </ul>
    </div>
  );
}
