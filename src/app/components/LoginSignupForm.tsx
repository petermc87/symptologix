import { SyntheticEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import authController from "../../../actions/singupForm";
import { FormTypes } from "../page";

// Desctructure the props in the state variable being passed down.
// This variable has been named state from page.tsx props being passed.
type FormPropsType = {
  state: FormTypes;
};

export default function LoginSingupForm({ state }: FormPropsType) {
  // Create state to manage whether the button click was signup or login.
  const [buttonState, setButtonState] = useState<Boolean>(false);

  // The handle submit function will contain a statement to instigate
  // either a login or signup.
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    // Storing each target value in a variable to be passed down.
    const target = e.target as typeof e.target & {
      name: string;
      email: string;
      username: string;
      password: any;
    };
    //-- EXAMPLE CODE FROM ANOTHER PROJECT. FOR REF ONLY --//
    // // Setting the input type as a standard form Element.
    // const data = new FormData(e.target as HTMLFormElement);
    // const urlQuery = data.get("urlquery")?.toString().trim();

    if (buttonState) {
      //Login state will be true
    } else {
      // Signup State
      // Desctructure form types before passing it into the authController. Use Kiddo or
      // mediamingle as an example.

      authController(target);

      console.log("this is signup state");
    }
  };

  return (
    <>
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Form.Group className="mb-2">
          {/* Name and username only show up as an option at signup. */}
          {state ? (
            <>
              <Form.Control name="name" placeholder="Name" className="mb-2" />
              <Form.Control
                name="username"
                placeholder="Username"
                className="mb-2"
              />
            </>
          ) : (
            ""
          )}

          <Form.Control name="email" placeholder="Email" className="mb-2" />
          <Form.Control
            name="password"
            placeholder="Password"
            className="mb-2"
          />
        </Form.Group>

        {state ? (
          <Button
            onClick={() => {
              setButtonState(false);
            }}
            className="mb-1"
            type="submit"
          >
            SIGNUP
          </Button>
        ) : (
          <Button
            onClick={() => {
              setButtonState(true);
            }}
            className="mb-1"
            type="submit"
          >
            LOGIN
          </Button>
        )}
      </Form>
    </>
  );
}
