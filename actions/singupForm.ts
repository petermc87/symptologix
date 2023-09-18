"use server";

import db from "@/app/modules/db";
import bcrypt from "bcrypt";
import { User } from "../typings";

// Bring in email and password props from signup/login form components.
export default async function authController({
  email,
  password,
  username,
  name,
}: User) {
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

  if (checkEmail) {
    return "Email Is Already taken.";
  } else {
    // Will add a new user to the database if the email is not already taken.
    const saltRounds = 10;
    let salted_password: any = await bcrypt.hash(password, saltRounds);
    let newUser;
    console.log(salted_password);
    try {
      newUser = await db.user.create({
        data: {
          email: email,
          password: salted_password,
          name: name,
          username: username,
        },
      });
      console.log(newUser);
    } catch (error) {
      console.error(error);
    }
  }
}
