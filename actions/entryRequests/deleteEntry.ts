"use server";

import db from "@/app/modules/db";

export default async function deleteEntryBackend(id: string) {
  await db.entry.delete({
    where: { id: id },
  });
}
