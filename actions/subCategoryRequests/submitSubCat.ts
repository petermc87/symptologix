"use server";

import db from "../../src/app/modules/db";
import { Subcategory } from "../../typings";
import getSubCategories from "./getSubCats";

export default async function submitSubCat({ name, categoryId }: Subcategory) {
  // Posting the new entry.
  await db.subCategory.create({
    data: {
      name: name,
      categoryId: categoryId,
    },
  });

  // Fetching all categories from the database.
  const subCategories = await getSubCategories();

  // Return the data posted.
  return subCategories;
}
