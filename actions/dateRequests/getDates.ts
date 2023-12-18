"use server";

import db from "@/app/modules/db";

export default async function getDates(user: string) {
  const dates = await db.calendarDates.findFirst({
    where: {
      user: user,
    },
  });
  return dates;
}
