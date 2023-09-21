"use server";

import db from "@/app/modules/db";

export default async function deleteLogBackend(id: string) {
  await db.log.delete({
    where: { id: id },
  });
}
