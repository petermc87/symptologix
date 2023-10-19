import { useSession } from "next-auth/react";
import Link from "next/link";
import GeneralButton from "../Button/Button";
import Hamburger from "../Hamburger/Hamburger";
import Logo from "../Logo/Logo";
import styles from "./NavBar.module.scss";

export default function NavBar() {
  // Check the user session data for a login object coming back.
  // If it does, then show the logout and other links
  const { data } = useSession();

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
          <Link href={"/home"}>
            <div>New Log</div>
          </Link>
          <Link href={"/previous"}>
            <div>Previous Logs</div>
          </Link>

          <div>Metrics</div>

          <Link href={"/"}>
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
