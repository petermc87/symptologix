"use client";
import { useSession } from "next-auth/react";

import { ReactNode } from "react";
import InputForm from "../components/InputForm";

export default function Home() {
  const { data, status } = useSession();
  return (
    <>
      {status ? (
        status === "authenticated" &&
        data !== null && (
          <>
            <h2>Welcome {data.user.username as ReactNode}</h2>
            <p>User ID: {data.user.id as ReactNode}</p>
            <InputForm />
          </>
        )
      ) : (
        <div>Authentification Failed. Please try logging in again.</div>
      )}
    </>
  );
}
