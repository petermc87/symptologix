"use server";

import db from "../../src/app/modules/db";
import getCategories from "./getCats";

export default async function submitCat(submitForm: string) {
  // Posting the new entry.
  await db.category.create({
    data: { name: submitForm },
  });

  // Fetching all categories from the database.
  const categories = await getCategories();

  // Return the data posted.
  return categories;
}
