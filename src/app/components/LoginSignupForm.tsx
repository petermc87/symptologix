import { signIn } from "next-auth/react";
import { SyntheticEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import registerUser from "../../../actions/singupForm";
import { FormTypes } from "../page";

// Desctructure the props in the state variable being passed down.
// This variable has been named state from page.tsx props being passed.
type FormPropsType = {
  state: FormTypes;
};

export default function LoginSingupForm({ state }: FormPropsType) {
  // Create state to manage whether the button click was signup or login.
  const [buttonState, setButtonState] = useState<Boolean>(false);

  // Create state for outputting exisiting Email.
  const [emailExists, setEmailExists] = useState<string>("");

  // The handle submit function will contain a statement to instigate
  // either a login or signup.
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    // Storing each target value in a variable to be passed down.
    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      username: { value: string };
      password: { value: any };
    };

    let name: string = "";
    let username: string = "";

    // Extracting the values from the form.
    // NOTE: We are assigning name and username only if it
    // is at signup. This avoids 'undefined' ts error.
    if (target.username || target.name) {
      name = target.name.value;
      username = target.username.value;
    }
    const email = target.email.value;
    const password = target.password.value;

    // Button for checking whether the client chooses login or signup on the landing page.
    if (buttonState) {
      // --> Login state <-- //
      // // Check if there is a user matching the email in the database.
      // const userReturn = loginForm(email);
      // if (!userReturn) {
      //   return setEmailExists(userReturn);
      // }
      // Sigin with the credentials provided.
      const user = await signIn("credentials", {
        email: email,
        password: password,
        callbackUrl: "/home",
      });
      if (!user) {
        return setEmailExists("Invalid username or password");
      }
    } else {
      // --> Signup State <-- //
      // Register the user first.
      // NOTE: Desctructure form types before passing it into the authController. Use Kiddo or
      // mediamingle as an example.
      const user = await registerUser({ email, password, username, name });
      // Setting state here by returning a unique string (this helps with distinguishing between
      // returning a user object or when there was an incorrect entry).
      // --> Checking if theres an error. <-- //
      if (
        user === "Email already exists" ||
        user === "There was an error when trying to signup. Please try again"
      ) {
        setEmailExists(user);
      } else if (!user) {
        setEmailExists("Sorry, the user wasnt created. Please try again.");
      }
      // --> Logging in to the NextAuth session if the user was created. <-- //
      // Log them in if there are no errors.
      await signIn("credentials", {
        email: email,
        password: password,

        callbackUrl: "/home",
      });
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
        {/* Ouput email already exists here. */}
        {emailExists ? <div>{emailExists}</div> : ""}
      </Form>
    </>
  );
}

// // THIS DIDNT WORK: Persist the message component using localStorage. -> Add underneath state declaration.
// useEffect(() => {
//   if (emailExists) {
//     // @ts-ignore
//     setEmailExists(JSON.parse(window.localStorage.getItem("emailExists")));
//   }
// }, []);

// useEffect(() => {
//   window.localStorage.setItem("emailExists", emailExists);
// }, [emailExists]);
