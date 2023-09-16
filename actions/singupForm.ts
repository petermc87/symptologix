import db from "@/app/modules/db";
import { User } from "../typings";

// Bring in email and password props from signup/login form components.
export default async function AuthController({ email, password }: User) {
  // Destructure the email and password props here.

  // Create a try catch here to await an object a user coming back.
  let checkEmail;
  try {
    checkEmail = await db.user.findUnique({
      where: {
        email: email,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
