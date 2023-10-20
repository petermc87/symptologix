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

  // Convert the name to lower case

  const convertedName = (name: string) => {};

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
            <li>
              <a className={styles.menuItem}>Log In</a>
            </li>
            <li>
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

/// ---> EXAMPLE FROM NAVBAR <--- ///
// // Update the context for showing the modal and setting the modal type.
// const { setShow, setState } = useContext<any>(NavBarContext);

// const router = useRouter();

// // It will clear the current next auth session and route back to
// // the landing page.
// const handleLogOut = () => {
//   router.push("/");
//   signOut();
// };

// const convertedName = name.split(" ").join("").toLocaleLowerCase();
// return (
//   <div className={styles.button}>
//     {/* If the button is log out, then make the data equal to null. */}
//     {convertedName === "logout" ? (
//       // Use the next link to reroute to the home page on click.
//       <Link href="/">
//         <Button onClick={handleLogOut}>{name}</Button>
//       </Link>
//     ) : (
//       <Button
//         onClick={() => {
//           // Set the type of form and show modal.
//           setState(convertedName);
//           setShow(true);
//         }}
//       >
//         {name}
//       </Button>
//     )}
//   </div>
// );
