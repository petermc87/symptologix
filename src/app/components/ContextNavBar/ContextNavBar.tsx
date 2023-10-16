// 1. Create context using state for Open, close and the state variable for Login and Singup.
// 2. Create context using state for Logout, CreateLogPage, PreviousLogsPage, and MetricsPage.

import { Dispatch, SetStateAction, createContext, useState } from "react";

// Export the counter context.

export type NavBarContextTypes = {
  show: boolean | null | undefined;
  setShow: Dispatch<SetStateAction<boolean | undefined>>;
  footerNavBarState: boolean | null | undefined;
  setFooterNavBarState: Dispatch<SetStateAction<boolean | undefined>>;
  state: string | null | undefined;
  setState: Dispatch<SetStateAction<string | undefined>>;
};

export const NavBarContext = createContext<NavBarContextTypes | false>(false);

export default function NavBarProvider(props: any) {
  // Showing the login or signup modal.
  const [show, setShow] = useState<boolean | undefined>(false);
  // Setting the modal type (either login or signup)
  const [state, setState] = useState<string | undefined>("");

  // Boolean to determine whether the navbar is being rendered in
  // the landing page or the other pages.
  const [footerNavBarState, setFooterNavBarState] = useState<
    boolean | undefined
  >(false);

  return (
    <NavBarContext.Provider
      value={{
        show,
        setShow,
        state,
        setState,
        footerNavBarState,
        setFooterNavBarState,
      }}
    >
      {props.children}
    </NavBarContext.Provider>
  );
}
