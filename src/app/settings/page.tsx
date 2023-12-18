"use client";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import getDates from "../../../actions/dateRequests/getDates";
import { User } from "../../../typings";
import {
  NavBarContext,
  NavBarContextTypes,
} from "../components/ContextNavBar/ContextNavBar";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import ProfileDetails from "../components/ProfileDetails/ProfileDetails";
import Reminders from "../components/Reminders/Reminders";
import SolidLine from "../components/SolidLine/SolidLine";
import styles from "./page.module.scss";

export default function Settings() {
  // Consume the context data for the dates.
  const { fromDate, setFromDate, toDate, setToDate } = useContext<
    NavBarContextTypes | any
  >(NavBarContext);

  const { data } = useSession();

  let currentUser: User;
  if (data) {
    currentUser = data?.user;
  }

  // Side affect to retrieve the previously saved dates.
  useEffect(() => {
    const getDatesRequest = async () => {
      const dates = await getDates(currentUser?.id as string);
      setFromDate(dates?.fromDate);
      setToDate(dates?.toDate);
    };
    getDatesRequest();
  }, []);

  return (
    <>
      <NavBar />
      <div className={styles.pageContainer}>
        <div className={styles.headingText} id={styles.reminder}>
          Set Your Reminders
        </div>
        <Reminders />
        <SolidLine />
        <div className={styles.headingText} id={styles.profile}>
          Your Profile
        </div>
        <ProfileDetails />
      </div>
      <Footer />
    </>
  );
}
