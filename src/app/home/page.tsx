"use client";
import { useSession } from "next-auth/react";

import { ReactNode } from "react";

export default function Home() {
  const { data, status } = useSession();
  return (
    <>
      {status && status === "authenticated" && data !== null && (
        <>
          <h2>Welcome {data.user.username as ReactNode}</h2>
          <p>User ID: {data.user.id as ReactNode}</p>
        </>
      )}
    </>
  );
}
