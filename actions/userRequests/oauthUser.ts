import db from "@/app/modules/db";
import { User } from "../../typings";

export default async function oauthStore(user: User) {
  // 1. Check if there is a user already there.
  const exisitingUser = await db.user.findUnique({
    where: {
      id: user.id as string,
    },
  });

  // 2. If it is not create a user.
  if (!exisitingUser) {
    const newUser = await db.user.create({
      data: {
        id: user.id as string,
        name: user.name as string,
        email: user.email as string,
        username: user.name as string,
        password: "",
      },
    });

    return newUser;
  } else {
    return exisitingUser;
  }
}
