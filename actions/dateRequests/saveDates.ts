"use server";

import db from "@/app/modules/db";

export default async function saveDates(to: Date, from: Date, id: string) {
  // Check if there is a date object already (there should only be one).
  const currentDates = await db.calendarDates.findFirst({
    where: {
      user: id,
    },
  });
  // If it does exist, update with the new data.
  if (currentDates) {
    await db.calendarDates.update({
      where: {
        id: currentDates.id,
      },
      data: {
        fromDate: from,
        toDate: to,
      },
    });
    // Otherwise, create a new record.
  } else {
    await db.calendarDates.create({
      data: {
        fromDate: from,
        toDate: to,
        user: id,
      },
    });
  }
}
