"use server";

import db from "@/app/modules/db";
export default async function GetUser(id: id) {
  await db.user.findUnique({
    where: {
      id: id,
    },
  });
}
