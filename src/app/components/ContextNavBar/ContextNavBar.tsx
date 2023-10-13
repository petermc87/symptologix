// 1. Create context using state for Open, close and the state variable for Login and Singup.
// 2. Create context using state for Logout, CreateLogPage, PreviousLogsPage, and MetricsPage.

// EXAMPLE ONE - DOESNT WORK!!
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

// Create type interface for the context.
type NavBarContextTypes = {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
};

// Define a new type for the React node i.e the children being
// passed down.
type NavBarProviderProps = {
  children: ReactNode;
};

// Pass the state vars into the create Context.
export const NavBarContext = createContext<NavBarContextTypes | null>(null);

export const NavbarProvider = ({ children }: NavBarProviderProps) => {
  // Create state for Login

  const [state, setState] = useState<string>("");

  // Return the context provider component.
  return (
    <NavBarContext.Provider value={{ state, setState }}>
      {children}
    </NavBarContext.Provider>
  );
};
