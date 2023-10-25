import { useSession } from "next-auth/react";
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
          <Link
            href={"/"}
            className={styles.desktopLinks}
            onClick={() => {
              console.log("click before");
              setTimeout(() => {
                console.log("click");
                router.push("/");
              }, 4000);
            }}
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
