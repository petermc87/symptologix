import GeneralButton from "../Button/Button";
import Hamburger from "../Hamburger/Hamburger";
import Logo from "../Logo/Logo";
import styles from "./NavBar.module.scss";

export default function NavBar() {
  return (
    <div className={styles.navbarWrapper}>
      {/* Set the state to usertype. NOTE: we dont need to set complex types. */}
      {/* We could use a boolean here. */}
      <Logo />
      <div className={styles.hamburgerVisible}>
        <Hamburger />
      </div>
      <div className={styles.buttonWrapper}>
        <GeneralButton name="Log In" />
        <GeneralButton name="Sign Up" />
      </div>
    </div>
  );
}
