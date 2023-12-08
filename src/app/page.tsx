"use client";
import Head from "next/head";
import GeneralButton from "./components/Button/Button";
import Footer from "./components/Footer/Footer";
import { default as SingnUpForm } from "./components/LoginSignupForm";
import NavBar from "./components/NavBar/NavBar";
import Perks from "./components/Perks/Perks";
import "./global.scss";
import styles from "./landing.module.scss";

// NOTE: the landing page will have a login/signup button in the middle
// or in the nav bar to make one of those appear

// TODO: Add in setting for initial state for someone that is a returning
// user, i.e.: the initial state will be loginForm. Otherwise, its signup.
export default function Home() {
  return (
    <>
      {" "}
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />

        <meta name="sympto-logix" content="sympto-logix" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="sympto-logix" />
        <meta name="description" content="sympto-logix" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <main>
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
      </main>
    </>
  );
}
