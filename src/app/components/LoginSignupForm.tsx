import { signIn } from "next-auth/react";
import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, Form } from "react-bootstrap";
import registerUser from "../../../actions/singupForm";
import { FormTypes } from "../page";
import styles from "./LoginSingupForm.module.scss";
// Desctructure the props in the state variable being passed down.
// This variable has been named state from page.tsx props being passed.
type FormPropsType = {
  state: FormTypes;
  setState: Dispatch<SetStateAction<string>>;
};

export default function LoginSingupForm({ state, setState }: FormPropsType) {
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

  // Add in a function call to close the signup/login modal when clicked
  // anywhere outside the modal. --> THIS DIDNT WORK AFTER TESTING!!!
  // const ref: any = useRef();

  // useOutsideClick(ref.current, () => {
  //   console.log("click");
  //   setState("");
  // });

  // Calling an event listener inside the dom element (the div below) --> THIS
  // DIDNT WORK AFTER TESTING!!!
  // const onClickOutsideListener = () => {
  //   alert("click outside!!");
  //   setState("");
  //   document.removeEventListener("click", onClickOutsideListener);
  // };

  // NOTE: To handle a click to close outside of the form:
  // Create a use ref instance.
  const ref = useRef<HTMLDivElement>(null);

  // Use a side effect to call the handle click outside.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setState("");
      }
    }
    // Bind to event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  console.log(state);
  return (
    <>
      {state === "signup" || state === "login" ? (
        <>
          <div ref={ref} className={styles.fullWrapper}>
            SymptologiX
            <div className={styles.loginWrapper}>
              {state === "signup" ? (
                <p> Sign Up</p>
              ) : state === "login" ? (
                <p>Log In</p>
              ) : (
                ""
              )}
              <Form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
                id={styles.formContainer}
              >
                <Form.Group className="mb-3">
                  {/* Name and username only show up as an option at signup. */}
                  {state === "signup" ? (
                    <>
                      <Form.Control
                        name="name"
                        placeholder="Name"
                        className="mb-3"
                      />
                      <Form.Control
                        name="username"
                        placeholder="Username"
                        className="mb-3"
                      />
                    </>
                  ) : (
                    ""
                  )}

                  <Form.Control
                    name="email"
                    placeholder="Email"
                    className="mb-3"
                  />
                  <Form.Control
                    name="password"
                    placeholder="Password"
                    className="mb-3"
                  />
                </Form.Group>

                {state === "signup" ? (
                  <Button
                    onClick={() => {
                      setButtonState(false);
                    }}
                    className="mb-1"
                    type="submit"
                  >
                    Sign Up
                  </Button>
                ) : state === "login" ? (
                  <Button
                    onClick={() => {
                      setButtonState(true);
                    }}
                    className="mb-1"
                    type="submit"
                  >
                    Log In
                  </Button>
                ) : (
                  ""
                )}
                {/* Output email already exists here. */}
                {emailExists ? <div>{emailExists}</div> : ""}
              </Form>
              <p id={styles.boldText}>
                <span>OR</span>
              </p>
              <div className={styles.googleSignup}>Sign in with google</div>
              {/* Text at the bottom of the form. */}
              {state === "signup" ? (
                <p id={styles.boldText}>
                  Dont have an account? <span>Log In</span>
                </p>
              ) : state === "login" ? (
                <p id={styles.boldText}>
                  Already have an account? <span>Sign up</span>
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

// //TODO: THIS DIDNT WORK: Persist the message component using localStorage. -> Add underneath state declaration.
// useEffect(() => {
//   if (emailExists) {
//     // @ts-ignore
//     setEmailExists(JSON.parse(window.localStorage.getItem("emailExists")));
//   }
// }, []);

// useEffect(() => {
//   window.localStorage.setItem("emailExists", emailExists);
// }, [emailExists]);
