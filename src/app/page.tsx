"use client";
import { useState } from "react";
import {
  default as LoginForm,
  default as SingnUpForm,
} from "./components/LoginSignupForm";
import styles from "./page.module.css";

// Create interface for both signup and login forms
interface LoginForm {
  email: string;
  password: string;
}

// Declare prop types for passing useState variable as a prop.
export type FormTypes = boolean;

// NOTE: the landing page will have a login/signup button in the middle
// or in the nav bar to make one of those appear

//TODO: Add in setting for initial state for someone that is a returning
// user, i.e.: the initial state will be loginForm. Otherwise, its signup.
export default function Home() {
  // Create state that will deteremine whether its a login or signup form.
  // true = Login, false = Signup.
  const [formState, setFormState] = useState<FormTypes>(false);

  return (
    <main className={styles.main}>
      <div>
        {/* Set the state to usertype. NOTE: we dont need to set complex types. */}
        {/* We could use a boolean here. */}
        <div onClick={() => setFormState(false)}>Login</div>or
        <div onClick={() => setFormState(true)}>signup</div>
      </div>
      {/* If our form is true, then we pass in props for login (part of user types), */}
      {/* and if its false, we pass in Signup form props (most of singup.) */}
      {formState ? (
        <>
          <LoginForm state={formState} />
        </>
      ) : (
        <>
          <SingnUpForm state={formState} />
        </>
      )}
    </main>
  );
}
