"use server";

import db from "@/app/modules/db";

export default async function getSubCategories(categoryId: any) {
  const subCategories = db.subCategory.findMany({
    where: { categoryId: categoryId },
  });

  return subCategories;
}
