import { Dispatch, SetStateAction } from "react";
import GeneralButton from "../Button/Button";
import Hamburger from "../Hamburger/Hamburger";
import Logo from "../Logo/Logo";
import styles from "./NavBar.module.scss";
type NavBarTypes = {
  // Declaring the type for a setter function here
  setFormState: Dispatch<SetStateAction<string>>;
  formState: string | null;
};

export default function NavBar({ setFormState, formState }: NavBarTypes) {
  return (
    <div className={styles.navbarWrapper}>
      {/* Set the state to usertype. NOTE: we dont need to set complex types. */}
      {/* We could use a boolean here. */}
      <Logo />
      <div className={styles.hamburgerVisible}>
        <Hamburger />
      </div>
      <div className={styles.buttonWrapper}>
        <GeneralButton
          name="Log In"
          setState={setFormState}
          state={formState}
        />
        <GeneralButton
          name="Sign Up"
          setState={setFormState}
          state={formState}
        />
      </div>
    </div>
  );
}
