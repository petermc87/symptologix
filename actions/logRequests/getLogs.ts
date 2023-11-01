"use server";

import db from "@/app/modules/db";
import { Log } from "../../typings";

// Import session data here. We can use the user.id to match up with the
// logs with matching userId parameter

export default async function GetLogs(id: string) {
  const logs: Log[] | null = await db.log.findMany({
    include: {
      entries: true,
    },
    where: {
      userId: id,
    },
  });
  return logs;
}
