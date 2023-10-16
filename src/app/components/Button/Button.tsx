import { useContext } from "react";
import { Button } from "react-bootstrap";
import { NavBarContext } from "../ContextNavBar/ContextNavBar";
import styles from "./Button.module.scss";

type buttonTypes = {
  name: string;
};

// export default function GeneralButton({ name, setState, state }: buttonTypes) {
export default function GeneralButton({ name }: buttonTypes) {
  // In order to make the conditional for the form  work,
  // concat the string and make sure its all lowercase.

  // Update the context for showing the modal and setting the modal type.
  const { setShow, setState } = useContext<any>(NavBarContext);

  const convertedName = name.split(" ").join("").toLocaleLowerCase();
  return (
    <div className={styles.button}>
      <Button
        onClick={() => {
          // Set the type of form and show modal.
          setState(convertedName);
          setShow(true);
        }}
      >
        {name}
      </Button>
    </div>
  );
}
