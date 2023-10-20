import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { NavBarContext } from "../ContextNavBar/ContextNavBar";
import styles from "./Button.module.scss";

type buttonTypes = {
  name: string;
};

export default function GeneralButton({ name }: buttonTypes) {
  // In order to make the conditional for the form  work,
  // concat the string and make sure its all lowercase.

  // Update the context for showing the modal and setting the modal type.
  const { setShow, setState } = useContext<any>(NavBarContext);

  const router = useRouter();
  // }

  // It will clear the current next auth session and route back to
  // the landing page.
  const handleLogOut = () => {
    router.push("/");
    signOut();
  };

  const convertedName = name.split(" ").join("").toLocaleLowerCase();
  return (
    <div className={styles.button}>
      {/* If the button is log out, then make the data equal to null. */}
      {convertedName === "logout" ? (
        // Use the next link to reroute to the home page on click.
        <Link href="/">
          <Button onClick={handleLogOut}>{name}</Button>
        </Link>
      ) : (
        <Button
          onClick={() => {
            // Set the type of form and show modal.
            setState(convertedName);
            setShow(true);
          }}
        >
          {name}
        </Button>
      )}
    </div>
  );
}
