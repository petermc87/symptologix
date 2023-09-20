"use server";

import db from "@/app/modules/db";

// Refactor for revalidation.
export default async function getCategories() {
  // const getCategories = cache(async () => {
  const categories = db.category.findMany({
    orderBy: { createdAt: "asc" },
  });

  return categories;
}

// export default getCategories;
