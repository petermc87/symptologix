"use server";

import db from "@/app/modules/db";
import { User } from "../../typings";

type typesForUser = {
  updatedUser: User | any;
};

export default async function UpdateUser(
  id: string,
  { updatedUser }: typesForUser
) {
  await db.user.update({
    where: {
      id: id,
    },

    data: {
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
    },
  });
}
