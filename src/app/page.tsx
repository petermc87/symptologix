"use client";
import { useState } from "react";
import {
  default as LoginForm,
  default as SingnUpForm,
} from "./components/LoginSignupForm";
import NavBar from "./components/NavBar/NavBar";
import "./global.scss";

import styles from "./landing.module.scss";

// Create interface for both signup and login forms
interface LoginForm {
  email: string;
  password: string;
}

// Declare prop types for passing useState variable as a prop.
export type FormTypes = string;

// NOTE: the landing page will have a login/signup button in the middle
// or in the nav bar to make one of those appear

//TODO: Add in setting for initial state for someone that is a returning
// user, i.e.: the initial state will be loginForm. Otherwise, its signup.
export default function Home() {
  // Create state that will deteremine whether its a login or signup form.
  // true = Login, false = Signup.
  const [formState, setFormState] = useState<FormTypes>("");

  return (
    <main>
      <NavBar setFormState={setFormState} formState={formState} />
      <></>
      {/* If our form is true, then we pass in props for login (part of user types), */}
      {/* and if its false, we pass in Signup form props (most of singup.) */}
      {formState ? (
        // Make one of these true on click. But, will otherwise be nothing. Create an
        // animation where the container slides down.
        // NOTE: we only need to update the state variable called 'state' above.
        <div className={styles.formWrapper}>
          <LoginForm state={formState} />
        </div>
      ) : (
        <div className={styles.formWrapper}>
          <SingnUpForm state={formState} />
        </div>
      )}
    </main>
  );
}
