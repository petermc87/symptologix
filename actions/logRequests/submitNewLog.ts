"use server";

import db from "@/app/modules/db";

type SubmitLogProps = {
  userId: string;
};

export default async function submitNewLog(userId: SubmitLogProps | any) {
  const log = await db.log.create({
    data: {
      userId: userId,
      content: "",
    },
  });

  return log;
}
