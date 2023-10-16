import "bootstrap/dist/css/bootstrap.css";
import type { Metadata } from "next";
import { Providers } from "./components/Providers/Providers";

export const metadata: Metadata = {
  title: "Smyptologix",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
