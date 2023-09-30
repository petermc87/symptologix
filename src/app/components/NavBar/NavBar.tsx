import { Dispatch, SetStateAction } from "react";
import { Button } from "react-bootstrap";
import Hamburger from "../Hamburger/Hamburger";
import styles from "./NavBar.module.scss";
type NavBarTypes = {
  // Declaring the type for a setter function here
  setFormState: Dispatch<SetStateAction<string>>;
  formState: string;
};

export default function NavBar({ setFormState, formState }: NavBarTypes) {
  return (
    <div className={styles.navbarWrapper}>
      {/* Set the state to usertype. NOTE: we dont need to set complex types. */}
      {/* We could use a boolean here. */}
      <div className={styles.logo}>
        <span>S</span>ymptologi<span id={styles.x}>X</span>
      </div>
      <div className={styles.hamburgerVisible}>
        <Hamburger />
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          onClick={() => {
            // Create a conditinional to check if the form is present already. If it
            // is, then hide the form with the next click.
            if (formState === "login") {
              setFormState("");
            } else {
              setFormState("login");
            }
          }}
        >
          Log In
        </Button>
        <Button
          onClick={() => {
            // Create a conditinional to check if the form is present already. If it
            // is, then hide the form with the next click.
            if (formState === "signup") {
              setFormState("");
            } else {
              setFormState("signup");
            }
          }}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}
