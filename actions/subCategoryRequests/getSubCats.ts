"use server";

import db from "@/app/modules/db";

// // Refactor to try out revalidation.
// export const revalidate = 3;
export default async function getSubCategories(categoryId: any) {
  // const getSubCategories = cache(async (categoryId: any) => {
  const subCategories = db.subCategory.findMany({
    where: { categoryId: categoryId },
  });

  return subCategories;
}

// export default getSubCategories;
// }
