"use server";

import db from "@/app/modules/db";

export default async function getLog(id: string) {
  const log = await db.log.findUnique({
    where: {
      id: id,
    },
    include: {
      entries: true,
    },
  });
  return log;
}
