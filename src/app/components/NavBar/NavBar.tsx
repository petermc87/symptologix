import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GeneralButton from "../Button/Button";
import Hamburger from "../Hamburger/Hamburger";
import Logo from "../Logo/Logo";
import styles from "./NavBar.module.scss";

export default function NavBar() {
  // Check the user session data for a login object coming back.
  // If it does, then show the logout and other links
  const { data } = useSession();

  // Instigate the useRouter hook to route back to the landing page
  // when the logout button is selected.
  const router = useRouter();

  // Handle logout and redirect.
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className={styles.navbarWrapper}>
      {/* Set the state to usertype. NOTE: we dont need to set complex types. */}
      {/* We could use a boolean here. */}
      <Logo />
      <div className={styles.hamburgerVisible}>
        <Hamburger />
      </div>
      {/* A boolean will determine whether its going to be a the landing page 
      buttons or if its going to be the pages redirects and a login. */}

      {data ? (
        <>
          <Link href={"/home"} className={styles.desktopLinks}>
            <div>New Log</div>
          </Link>
          <Link href={"/previous"} className={styles.desktopLinks}>
            <div>Previous Logs</div>
          </Link>
          <Link href={"/insights"} className={styles.desktopLinks}>
            <div>Insights</div>
          </Link>
          <Link href={"/settings"} className={styles.desktopLinks}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-gear-fill"
              viewBox="0 0 16 16"
            >
              <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
            </svg>
          </Link>
          <Link
            href={"/"}
            className={styles.desktopLinks}
            onClick={handleLogout}
          >
            <GeneralButton name="Log Out" />
          </Link>
        </>
      ) : (
        <div className={styles.buttonWrapper}>
          <GeneralButton name="Log In" />
          <GeneralButton name="Sign Up" />
        </div>
      )}
    </div>
  );
}
