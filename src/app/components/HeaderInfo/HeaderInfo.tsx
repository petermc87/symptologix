import Link from "next/link";
import { ReactNode, useContext } from "react";
import {
  NavBarContext,
  NavBarContextTypes,
} from "../ContextNavBar/ContextNavBar";
import styles from "./HeaderInfo.module.scss";

type HeaderInfoTypes = {
  userName: string;
};

export default function HeaderInfo({ userName }: HeaderInfoTypes) {
  const { currentLog, viewEntryForm, setViewEntryForm } = useContext<
    NavBarContextTypes | any
  >(NavBarContext);
  return (
    <>
      {/* WELCOME HEADER */}
      <div className={styles.welcomeHeader}>
        <h2 className={styles.intro}>
          Welcome <span>{userName as ReactNode}!</span>
        </h2>
        {/* Heading text will not be visible when the entryform is active */}
        {!viewEntryForm && !currentLog ? (
          <div className={styles.heading}>
            Create new {/* Add state here to show the whole entry form */}
            <span
              key={123}
              onClick={() => {
                setViewEntryForm(true);
              }}
            >
              entry form
            </span>
            , look at symptom{" "}
            <Link href={"/insights"}>
              <span>insights</span>
            </Link>
            , or{" "}
            <Link href={"/previous"}>
              <span>previous logs</span>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
