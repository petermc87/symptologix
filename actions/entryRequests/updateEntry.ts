"use server";

import db from "@/app/modules/db";

export default async function updateEntryBackend(id: string, newEntry: string) {
  await db.entry.update({
    where: {
      id: id,
    },
    data: {
      entry: newEntry,
    },
  });
}
