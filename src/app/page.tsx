"use client";
import { useState } from "react";
import GeneralButton from "./components/Button/Button";
import {
  default as LoginForm,
  default as SingnUpForm,
} from "./components/LoginSignupForm";
import NavBar from "./components/NavBar/NavBar";
import "./global.scss";

import { NavbarProvider } from "./components/ContextNavBar/ContextNavBar";
import Footer from "./components/Footer/Footer";
import Perks from "./components/Perks/Perks";
import styles from "./landing.module.scss";

// Create interface for both signup and login forms
interface LoginForm {
  email: string;
  password: string;
}

// NOTE: the landing page will have a login/signup button in the middle
// or in the nav bar to make one of those appear

//TODO: Add in setting for initial state for someone that is a returning
// user, i.e.: the initial state will be loginForm. Otherwise, its signup.
export default function Home() {
  // Create state that will deteremine whether its a login or signup form.
  // true = Login, false = Signup.
  const [formState, setFormState] = useState<string>("");

  // State to determine whether it is a footer in logs or in landing page.
  const [footerState, setFooterState] = useState(false);

  return (
    <main>
      <NavbarProvider>
        <NavBar />
      </NavbarProvider>
      {/* TODO: Add animation for container reveal */}
      <></>
      {/* Using a string to determine whether the login or singup container is present. */}
      {/* If either one is present, it will appear with background blur! */}
      {formState === "login" ? (
        // Make one of these true on click. But, will otherwise be nothing. Create an
        // animation where the container slides down.
        // NOTE: we only need to update the state variable called 'state' above.
        <div className={styles.formWrapper}>
          {/* State may need to be passed into the login where it will be  */}
          {/* then passed into the logs home page. */}
          <NavbarProvider>
            <LoginForm />
          </NavbarProvider>
        </div>
      ) : formState === "signup" ? (
        <div className={styles.formWrapper}>
          {/* Wrap this in the navbar provider. */}
          <NavbarProvider>
            <SingnUpForm />
          </NavbarProvider>
        </div>
      ) : (
        ""
      )}
      <div className={styles.heroContainer}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContents}>
            <h1 className={styles.heroText}>
              Be in <span>Control</span> of your <span>Symptoms</span>
            </h1>
            {/* Replace this with the NavbarProvider. */}
            {/* Make sure the state for name and set state is changed here in the */}
            {/* context. */}
            {/* NOTE: We might not need to use name. Although, thinking about it more, you  */}
            {/* would still need to distinguish between this and the login. The only way i  */}
            {/* can think of separating them is by using a prop. */}
            <NavbarProvider>
              <GeneralButton name="Sign Up" />
            </NavbarProvider>
          </div>
        </div>
      </div>
      <Perks />
      {/* If this is a landing page footer, then accept types. Otherwise, do not. */}

      {}
      <Footer setState={setFormState} state={formState} />
    </main>
  );
}
