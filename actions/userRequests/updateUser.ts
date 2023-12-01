"use server";
import db from "@/app/modules/db";
type typesForUser = {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
};

export default async function UpdateUser({
  id,
  name,
  username,
  email,
}: typesForUser) {
  console.log(id, name, username, email);
  await db.user.update({
    where: {
      id: id,
    },

    data: {
      name: name,
      username: username,
      email: email,
    },
  });
}
