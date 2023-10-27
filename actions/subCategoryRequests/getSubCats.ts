"use server";

import db from "@/app/modules/db";

export default async function getSubCategories() {
  // OLD WAY: Filtering by cat id. This is more work!!
  // const subCategories = db.subCategory.findMany({
  //   where: { categoryId: categoryId },
  // });

  // BETTER WAY: Call all subcategories and filter by cat in the front end.
  // Only one call needed!
  const subCategories = await db.subCategory.findMany();

  return subCategories;
}
