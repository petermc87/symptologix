"use server";

import db from "@/app/modules/db";

export default async function saveDates(to: Date, from: Date, id: string) {
  console.log(to, from, id);
  //   const datesSaved = await db.calendarDates.create({
  //     data: {
  //       fromDate: new Date(),
  //       toDate: new Date(),
  //       user: id,
  //     },
  //   });
  //   console.log(datesSaved);
  await db.calendarDates.create({
    data: {
      fromDate: from,
      toDate: to,
      user: id,
    },
  });
}
