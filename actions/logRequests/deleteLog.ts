"use server";

import db from "@/app/modules/db";

// If statement in the front end will decide to either delete both the
// log and the entry, or just the log. This will depend on whether the log
// is empty or not.

export async function deleteLogBackend(id: string) {
  await db.log.delete({
    where: { id: id },
  });
}

export async function deleteLogWithEntries(id: string) {
  // Delete the entries first
  await db.entry.deleteMany({
    where: {
      logId: id,
    },
  });

  // Then delete the log.
  await db.log.delete({
    where: {
      id: id,
    },
  });
}
