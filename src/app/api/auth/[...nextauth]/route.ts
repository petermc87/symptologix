import db from "@/app/modules/db";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextAuthOptions, RequestInternal } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import oauthStore from "../../../../../actions/userRequests/oauthUser";
// ERROR:  The expected type comes from property 'authorize'
// which is declared here on type 'UserCredentialsConfig<{ email: { label: string; placeholder:...
// This is because the types for next-auth have id as a string and not a user. Here, we
// reassign the types.
declare module "next-auth" {
  // Types for destructuring the credentials in the authorize function.
  interface User {
    id: number;
    password: string | undefined | number | null;
    email: string | undefined | null;
  }
  // Login session types for the ID.
  interface Session {
    user: {
      id: number | unknown;
      username: string | unknown;
    };
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
      async authorize(
        credentials,
        _req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
      ) {
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
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          // If the password is not valid, just return null.
          if (!isPasswordValid) {
            console.log("Not valid");
            return null;
          }
          // Otherwise, its a success, so return the user object
          return user;
        }
        // Otherwise return null, which would be other cases besides passowrd invalid.
        return null;
      },
    }),
    // Google provider.
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  // This will be instigated right after the account is retrieved.
  callbacks: {
    // The sessions user id will be the token id
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      // --> Create a user in the db if it hasnt been created already.
      // 1. Find the user in the database. If its not there, create a new one.
      // NOTE: A new variable is created to ensure types are declared
      const userSession = session.user as User;

      // When signing up regularly, the username is a required field. So, if
      // the user signs in with google, there wont be a username created.
      // This ensures that the profile is created when first signing in with
      // google.
      const returnedUser = await oauthStore(userSession);

      //  Setting the username in the session as well.
      session.user.username = returnedUser.username;

      // REFERENCE: https://www.youtube.com/watch?v=I_YCC_nFt70&t=16s
      return session;
    },

    // Creating the token. Requires: user id for the tokend id.
    jwt({ token, account, trigger, session, user }) {
      if (account) {
        token.accessToken = account.access_token;

        token.id = user.id;
        token.username = (user as User | any).username;
      }

      // Update for name, username and email in the frontend session data.
      // NOTE: Each statement had to be a separate if to avoid issues with
      // logging in.
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }

      if (trigger === "update" && session?.username) {
        token.username = session.username;
      }

      if (trigger === "update" && session?.email) {
        token.email = session.email;
      }
      return token;
    },
  },
  // Current page where signin is happening.
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SESSION_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
