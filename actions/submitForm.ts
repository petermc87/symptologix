"use server";

import db from "../src/app/modules/db";

export default async function submitForm(submitForm: string) {
  // Posting the new entry.
  await db.category.create({
    data: { name: submitForm },
  });

  // Fetching all posts from the database.
  const categories = await db.category.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Return the data posted.
  return categories;
}
