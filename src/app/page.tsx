"use client";
import GeneralButton from "./components/Button/Button";
import { default as SingnUpForm } from "./components/LoginSignupForm";
import NavBar from "./components/NavBar/NavBar";
import "./global.scss";

import NavBarProvider from "./components/ContextNavBar/ContextNavBar";
import Footer from "./components/Footer/Footer";
import Perks from "./components/Perks/Perks";
import styles from "./landing.module.scss";

// NOTE: the landing page will have a login/signup button in the middle
// or in the nav bar to make one of those appear

// TODO: Add in setting for initial state for someone that is a returning
// user, i.e.: the initial state will be loginForm. Otherwise, its signup.
export default function Home() {
  return (
    <>
      <main>
        <NavBarProvider>
          <NavBar />
          <SingnUpForm />
          <div className={styles.heroContainer}>
            <div className={styles.heroContainer}>
              <div className={styles.heroContents}>
                <h1 className={styles.heroText}>
                  Be in <span>Control</span> of your <span>Symptoms</span>
                </h1>
                {/* Buttons will set the state to a string based on whether it is login
                or signup. */}
                <GeneralButton name="Sign Up" />
              </div>
            </div>
          </div>
          <Perks />
          <Footer />
        </NavBarProvider>
      </main>
    </>
  );
}
