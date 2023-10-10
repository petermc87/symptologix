import { Dispatch, SetStateAction } from "react";
import { Button } from "react-bootstrap";
import styles from "./Button.module.scss";

type buttonTypes = {
  name: string;
  state: any;
  setState: Dispatch<SetStateAction<string>>;
};

export default function GeneralButton({ name, setState, state }: buttonTypes) {
  // In order to make the conditional for the form  work,
  // concat the string and make sure its all lowercase.

  const convertedName = name.split(" ").join("").toLocaleLowerCase();

  return (
    <div className={styles.button}>
      <Button
        onClick={() => {
          // Create a conditinional to check if the form is present already. If it
          // is, then hide the form with the next click.
          if (state === name) {
            if (name) {
            }
          } else {
            setState(convertedName);
          }
        }}
      >
        {name}
      </Button>
    </div>
  );
}
