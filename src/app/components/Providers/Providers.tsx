"use client";

import NavBarProvider from "../ContextNavBar/ContextNavBar";
import AuthProvider from "../authprovider/AuthProvider";

export function Providers({ children }: any) {
  return (
    <NavBarProvider>
      <AuthProvider>{children}</AuthProvider>
    </NavBarProvider>
  );
}
