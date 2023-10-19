import { Dispatch, ReactNode, SetStateAction } from "react";
import styles from "./HeaderInfo.module.scss";

type HeaderInfoTypes = {
  userName: string;
  viewEntryForm: boolean;
  setViewEntryForm: Dispatch<SetStateAction<boolean>>;
};

export default function HeaderInfo({
  userName,
  viewEntryForm,
  setViewEntryForm,
}: HeaderInfoTypes) {
  return (
    <>
      {/* WELCOME HEADER */}
      <div className={styles.welcomeHeader}>
        <h2 className={styles.intro}>
          Welcome <span>{userName as ReactNode}!</span>
        </h2>
        {/* Heading text will not be visible when the entryform is active */}
        {!viewEntryForm ? (
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
            , look at <span>metrics</span>, or <span>previous logs</span>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
