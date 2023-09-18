import db from "@/app/modules/db";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
// ERROR:  The expected type comes from property 'authorize'
// which is declared here on type 'UserCredentialsConfig<{ email: { label: string; placeholder:...
// This is because the types for next-auth have id as a string and not a user. Here, we
// reassign the types.
declare module "next-auth" {
  interface User {
    id: number;
    password: string | undefined | null;
    email: string | undefined | null;
  }
}

const authOptions: NextAuthOptions = {
  // These could be google, or facebook, etc...
  providers: [
    // Regualar NextJS provider (standard form.)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", placeholder: "Enter Email..." },
        password: { label: "Password", placeholder: "Enter Password..." },
      },
      // Checking email and password.
      async authorize(credentials) {
        // No credentials OR email within the credentials OR password will return null.
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        // Finiding the user object matching the email.
        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // Provided we have the email and password entered, using bcypt compare.
        if (user?.email && user?.password) {
          console.log(user.email, user.password);
          bcrypt.compare(
            user?.password,
            credentials.password,
            (err: any, user: any) => {
              if (err) return err;
              // Return the user object if the password matches!
              if (user) {
                console.log(user);
                return user;
              } else {
                return null;
              }
            }
          );
        }
        // Otherwise return null, like in the case of an invalid password.
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// if (user?.email && user?.password) {
//   bcrypt.compare(
//     user?.password,
//     credentials.password,
//     (err: any, data: any) => {
//       if (err) return err;
//       if (data) return data;
//       else {
//         return null;
//       }
//     }
//   );
// }
