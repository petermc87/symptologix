// 1. Create context using state for Open, close and the state variable for Login and Singup.
// 2. Create context using state for Logout, CreateLogPage, PreviousLogsPage, and MetricsPage.
"use client";
import { Category } from "@prisma/client";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import { Entry, Log, Subcategory } from "../../../../typings";

// Export the counter context.

export type NavBarContextTypes = {
  fromDate: Date | null | undefined;
  setFromDate: Dispatch<SetStateAction<Date>>;
  toDate: Date | null | undefined;
  setToDate: Dispatch<SetStateAction<Date>>;
  show: boolean | null | undefined;
  setShow: Dispatch<SetStateAction<boolean | undefined>>;
  footerNavBarState: boolean | null | undefined;
  setFooterNavBarState: Dispatch<SetStateAction<boolean | undefined>>;
  state: string | null | undefined;
  setState: Dispatch<SetStateAction<string | undefined>>;
  subCategories: Subcategory[] | null | undefined;
  setSubCategories: Dispatch<SetStateAction<Subcategory[] | null | undefined>>;
  currentLog: Log | null | undefined;
  setCurrentLog: Dispatch<SetStateAction<Log | null | undefined>>;
  viewEntryForm: boolean | undefined;
  setViewEntryForm: Dispatch<SetStateAction<boolean | undefined>>;
  logs: Log[] | undefined | null | void;
  setLogs: Dispatch<SetStateAction<Log[] | undefined | null | void>>;
  categories: Category[] | undefined | null | void;
  setCategories: Dispatch<SetStateAction<Category[] | undefined | null | void>>;
  entries: Entry[] | undefined | null | void;
  setEntries: Dispatch<SetStateAction<Entry[] | undefined | null | void>>;
  mostOccurringState: object | null;
  setMostOccurringState: Dispatch<SetStateAction<object | null>>;
  mostOccurringCategories: Array<string> | null;
  setMostOccurringCategories: Dispatch<SetStateAction<Array<string> | null>>;
};

export const NavBarContext = createContext<NavBarContextTypes | null>(null);

export default function NavBarProvider(props: any) {
  // Date being set from the calendar.
  const [fromDate, setFromDate] = useState<Date>(new Date());

  // Date being set from the calendar.
  const [toDate, setToDate] = useState<Date>(new Date());
  // Showing the login or signup modal.
  const [show, setShow] = useState<boolean | undefined>(false);
  // Setting the modal type (either login or signup)
  const [state, setState] = useState<string | undefined>("");
  // Boolean to determine whether the navbar is being rendered in
  // the landing page or the other pages.
  const [footerNavBarState, setFooterNavBarState] = useState<
    boolean | undefined
  >(false);

  // State for holding the current log.
  const [currentLog, setCurrentLog] = useState<Log | null | undefined>(null);

  // State for holding the subcategories
  const [subCategories, setSubCategories] = useState<
    Subcategory[] | null | undefined
  >(null);

  // State for holding view form
  const [viewEntryForm, setViewEntryForm] = useState<boolean | undefined>(
    false
  );

  // State for holding all logs.
  const [logs, setLogs] = useState<Log[] | undefined | null | void>(null);

  // State for holding categories.
  const [categories, setCategories] = useState<
    Category[] | undefined | null | void
  >(null);

  // State for holding entries
  const [entries, setEntries] = useState<Entry[] | undefined | null | void>(
    null
  );
  // Store the flow chart occurrences
  const [mostOccurringState, setMostOccurringState] = useState<object | null>(
    null
  );

  // Store the filtered categories
  const [mostOccurringCategories, setMostOccurringCategories] =
    useState<Array<string> | null>(null);

  return (
    <NavBarContext.Provider
      value={{
        show,
        setShow,
        state,
        setState,
        footerNavBarState,
        setFooterNavBarState,
        subCategories,
        setSubCategories,
        currentLog,
        setCurrentLog,
        viewEntryForm,
        setViewEntryForm,
        logs,
        setLogs,
        categories,
        setCategories,
        entries,
        setEntries,
        mostOccurringState,
        setMostOccurringState,
        mostOccurringCategories,
        setMostOccurringCategories,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
      }}
    >
      {props.children}
    </NavBarContext.Provider>
  );
}
