// 1. Create context using state for Open, close and the state variable for Login and Singup.
// 2. Create context using state for Logout, CreateLogPage, PreviousLogsPage, and MetricsPage.

import { Dispatch, SetStateAction, createContext, useState } from "react";

// Export the counter context.

export type NavBarContextTypes = {
  show: boolean | null | undefined;
  setShow: Dispatch<SetStateAction<boolean | undefined>>;
};

export const NavBarContext = createContext<NavBarContextTypes | false>(false);

export default function NavBarProvider(props: any) {
  const [show, setShow] = useState<boolean | undefined>();

  return (
    <NavBarContext.Provider value={{ show, setShow }}>
      {props.children}
    </NavBarContext.Provider>
  );
}
// // EXAMPLE ONE - DOESNT WORK!!
// import {
//   Dispatch,
//   ReactNode,
//   SetStateAction,
//   createContext,
//   useState,
// } from "react";

// // Create type interface for the context.
// export type NavBarContextTypes = {
//   state: string | null;
//   setState: Dispatch<SetStateAction<string>>;
// };

// // Define a new type for the React node i.e the children being
// // passed down.
// type NavBarProviderProps = {
//   children: ReactNode;
// };

// // Pass the state vars into the create Context.
// export const NavBarContext = createContext<NavBarContextTypes | null>(null);

// export const NavbarProvider = ({ children }: NavBarProviderProps) => {
//   // Create state for Login

//   const [state, setState] = useState<string>("");

//   // Return the context provider component.
//   return (
//     <NavBarContext.Provider value={{ state, setState }}>
//       {children}
//     </NavBarContext.Provider>
//   );
// };
