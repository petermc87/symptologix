"use server";

import db from "@/app/modules/db";
import { Log } from "../../typings";

export default async function GetLogs() {
  const logs: Log[] | null = await db.log.findMany({
    include: {
      entries: true,
    },
  });
  return logs;
}
