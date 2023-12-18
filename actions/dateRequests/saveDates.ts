"use server";

import db from "@/app/modules/db";

export default async function saveDates(to: Date, from: Date, id: string) {
  await db.calendarDates.create({
    data: {
      fromDate: from,
      toDate: to,
      user: id,
    },
  });
}
