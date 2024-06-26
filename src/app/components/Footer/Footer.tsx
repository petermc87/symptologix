import year from "@/app/helpers/year";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Link from "next/link";
import GeneralButton from "../Button/Button";
import Logo from "../Logo/Logo";
import styles from "./Footer.module.scss";

// To distinguish between a footer rendering in the logged in section, and
// the landing page, create a state variable
function Footer() {
  // Checking if there is a user object created. If there is, it should affect the
  // what is being rendered.
  const { data } = useSession();

  return (
    <div className={styles.footerContainer}>
      <div className={styles.paddingWrapper}>
        <div className={styles.header}>
          <Logo />

          {!data ? (
            <>
              <div className={styles.wrapper}>
                <h2 className={styles.footerHeading}>Sign Up to Learn More!</h2>
                <GeneralButton name="Sign Up" />
              </div>
            </>
          ) : (
            <div className={styles.wrapper}>
              <h2 className={styles.footerHeading}>
                Please check out our links below
              </h2>
            </div>
          )}
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
      </div>

      <div className={styles.bottom}>
        {/* // Get social icons form kiddoart. */}
        <div
          className={styles.socials}
          style={{ fontSize: "2rem", color: "white" }}
        >
          <Link href={"https://www.linkedin.com/in/petermcgibney/"}>
            <FontAwesomeIcon
              icon={faLinkedin}
              className="fa-solid fa-linkedin fa-1x"
            />
          </Link>

          <Link href={"https://www.instagram.com/petermc/"}>
            <FontAwesomeIcon
              icon={faInstagram}
              className="fa-solid fa-instagram fa-1x"
            />
          </Link>

          <Link href={"https://www.facebook.com/peter.mcgibney.3"}>
            <FontAwesomeIcon
              icon={faFacebook}
              className="fa-solid fa-facebook fa-1x"
            />
          </Link>
          <Link href={"https://github.com/petermc87"}>
            <FontAwesomeIcon
              icon={faGithub}
              className="fa-solid fa-github fa-1x"
            />
          </Link>
        </div>
        <div className={styles.copyRight}>Ⓒ {year} symptologix</div>
      </div>
    </div>
  );
}

export default Footer;
