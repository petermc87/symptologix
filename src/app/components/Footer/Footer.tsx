import { Dispatch, SetStateAction } from "react";
import GeneralButton from "../Button/Button";
import Logo from "../Logo/Logo";
import styles from "./Footer.module.scss";

type FooterTypes = {
  setState: Dispatch<SetStateAction<string>>;
  state: string;
};

export default function Footer({ setState, state }: FooterTypes) {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.header}>
        <Logo />
        <div className={styles.wrapper}>
          <h2 className={styles.footerHeading}>Sign Up to Learn More!</h2>
          <GeneralButton name="Sign Up" state={state} setState={setState} />
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.subList} id={styles.contact}>
          <h2 className={styles.footerHeading}>Contact</h2>
          <p>3147 35th Street</p>
          <p>Astoria</p>
          <p>New York</p>
          <p>11106</p>
          <br />
          <p>Phone: (929) 418-5827</p>
          <p>peter@mapandsnap.org</p>
        </div>
        <div className={styles.subList} id={styles.menu}>
          <h2 className={styles.footerHeading}>Menu</h2>
          <p>Home</p>
          <p>Perks</p>
          <p>FAQs</p>
          <p>About</p>
        </div>
        <div className={styles.subList} id={styles.otherlinks}>
          <h2 className={styles.footerHeading}>Other Links</h2>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
          <p>Portfolio</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.socials}></div>
        <div>Ⓒ 2023 symptologix</div>
      </div>
    </div>
  );
}
