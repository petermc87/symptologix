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

  const convertedName = name.split(" ").join("").toLocaleLowerCase();

  // Take out the state variables from the context.

  const newContext: any = useContext(NavBarContext);

  // if (newContext) console.log(newContext.state);
  return (
    <div className={styles.button}>
      <Button
        onClick={() => {
          console.log("click");
          if (newContext) {
            newContext.setState(convertedName);
          }
        }}
      >
        {name}
      </Button>
    </div>
  );
}
