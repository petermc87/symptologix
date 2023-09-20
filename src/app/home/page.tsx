"use client";
import { useSession } from "next-auth/react";

import { ReactNode } from "react";
import InputForm from "../components/InputForm";
import LogForm from "../components/LogForm/Logform";
export default function Home() {
  const { data, status } = useSession();

  let userData: any;
  try {
    if (data && data !== undefined) {
      userData = data;
    }
  } catch (error: any) {
    console.error(error);
  }
  return (
    <>
      {status ? (
        status === "authenticated" &&
        data !== null && (
          <>
            <h2>Welcome {userData.user.username as ReactNode}</h2>
            <p>User ID: {userData.user.id as ReactNode}</p>
            <InputForm user={userData.user} />
            <LogForm />
          </>
        )
      ) : (
        <div>Authentification Failed. Please try logging in again.</div>
      )}
    </>
  );
}
